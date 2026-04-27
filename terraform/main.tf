terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.10"
    }
  }
}

provider "azurerm" {
  features {}
}

# --- Management Group / Resource Group ---
resource "azurerm_resource_group" "bca_prod" {
  name     = "rg-bca-enterprise-prod-001"
  location = "East US"
  tags = {
    Environment = "Production"
    Project     = "BCA"
    CostCenter  = "IT-Governance"
  }
}

# --- Network: Hub/Spoke Integration ---
module "vnet" {
  source              = "./modules/network"
  resource_group_name = azurerm_resource_group.bca_prod.name
  location            = azurerm_resource_group.bca_prod.location
  address_space       = ["10.200.0.0/16"]
}

# --- Compute: Managed Kubernetes (AKS) ---
resource "azurerm_kubernetes_cluster" "bca_cluster" {
  name                = "aks-bca-prod-001"
  location            = azurerm_resource_group.bca_prod.location
  resource_group_name = azurerm_resource_group.bca_prod.name
  dns_prefix          = "bcaplatform"

  default_node_pool {
    name       = "systempool"
    node_count = 3
    vm_size    = "Standard_D4s_v3"
    vnet_subnet_id = module.vnet.aks_subnet_id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
    load_balancer_sku = "standard"
  }
}

# --- Data: Managed PostgreSQL Flexible Server ---
resource "azurerm_postgresql_flexible_server" "bca_db" {
  name                   = "psql-bca-enterprise-prod"
  resource_group_name    = azurerm_resource_group.bca_prod.name
  location               = azurerm_resource_group.bca_prod.location
  version                = "13"
  administrator_login    = "bca_admin"
  administrator_password = var.db_password # Provided via TF_VAR
  storage_mb             = 102400
  sku_name               = "GP_Standard_D2s_v3"
}

# --- Key Vault for Enterprise Secret Management ---
resource "azurerm_key_vault" "bca_vault" {
  name                        = "kv-bca-prod-001"
  location                    = azurerm_resource_group.bca_prod.location
  resource_group_name         = azurerm_resource_group.bca_prod.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                    = "premium"
  enabled_for_disk_encryption = true
}

data "azurerm_client_config" "current" {}
