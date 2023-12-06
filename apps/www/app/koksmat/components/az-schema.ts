import { name } from "@azure/msal-browser/dist/packageMetadata";

export namespace AzContext {
    export interface Root {
        Name: string;
        Account: Account;
        Environment: Environment;
        Subscription: Subscription;
        Tenant: Tenant;
        TokenCache: any;
        VersionProfile: any;
        ExtendedProperties: ExtendedProperties5;
    }

    export interface Account {
        Id: string;
        Type: string;
        Tenants: string[];
        AccessToken: any;
        Credential: any;
        TenantMap: TenantMap;
        CertificateThumbprint: any;
        ExtendedProperties: ExtendedProperties;
    }

    export interface TenantMap { }

    export interface ExtendedProperties {
        HomeAccountId: string;
        UseDeviceAuth: string;
        Subscriptions: string;
        Tenants: string;
    }

    export interface Environment {
        Name: string;
        Type: string;
        EnableAdfsAuthentication: boolean;
        OnPremise: boolean;
        ActiveDirectoryServiceEndpointResourceId: string;
        AdTenant: string;
        GalleryUrl: any;
        ManagementPortalUrl: string;
        ServiceManagementUrl: string;
        PublishSettingsFileUrl: string;
        ResourceManagerUrl: string;
        SqlDatabaseDnsSuffix: string;
        StorageEndpointSuffix: string;
        ActiveDirectoryAuthority: string;
        GraphUrl: string;
        GraphEndpointResourceId: string;
        TrafficManagerDnsSuffix: string;
        AzureKeyVaultDnsSuffix: string;
        DataLakeEndpointResourceId: string;
        AzureDataLakeStoreFileSystemEndpointSuffix: string;
        AzureDataLakeAnalyticsCatalogAndJobEndpointSuffix: string;
        AzureKeyVaultServiceEndpointResourceId: string;
        ContainerRegistryEndpointSuffix: string;
        AzureOperationalInsightsEndpointResourceId: string;
        AzureOperationalInsightsEndpoint: string;
        AzureAnalysisServicesEndpointSuffix: string;
        AnalysisServicesEndpointResourceId: string;
        AzureAttestationServiceEndpointSuffix: string;
        AzureAttestationServiceEndpointResourceId: string;
        AzureSynapseAnalyticsEndpointSuffix: string;
        AzureSynapseAnalyticsEndpointResourceId: string;
        VersionProfiles: any[];
        ExtendedProperties: ExtendedProperties2;
        BatchEndpointResourceId: string;
    }

    export interface ExtendedProperties2 {
        AzureAppConfigurationEndpointResourceId: string;
        AzureSynapseAnalyticsEndpointResourceId: string;
        AzurePurviewEndpointResourceId: string;
        OperationalInsightsEndpoint: string;
        ContainerRegistryEndpointResourceId: string;
        AzureAppConfigurationEndpointSuffix: string;
        AzureAttestationServiceEndpointSuffix: string;
        AnalysisServicesEndpointResourceId: string;
        OperationalInsightsEndpointResourceId: string;
        MicrosoftGraphUrl: string;
        ManagedHsmServiceEndpointSuffix: string;
        MicrosoftGraphEndpointResourceId: string;
        AzurePurviewEndpointSuffix: string;
        AzureAttestationServiceEndpointResourceId: string;
        ManagedHsmServiceEndpointResourceId: string;
        AzureAnalysisServicesEndpointSuffix: string;
        AzureSynapseAnalyticsEndpointSuffix: string;
    }

    export interface Subscription {
        Id: string;
        Name: string;
        State: string;
        SubscriptionId: string;
        TenantId: string;
        HomeTenantId: string;
        ManagedByTenantIds: any[];
        CurrentStorageAccountName: any;
        SubscriptionPolicies: SubscriptionPolicies;
        ExtendedProperties: ExtendedProperties3;
        CurrentStorageAccount: any;
        AuthorizationSource: string;
        Tags: any;
    }

    export interface SubscriptionPolicies {
        LocationPlacementId: string;
        QuotaId: string;
        SpendingLimit: string;
    }

    export interface ExtendedProperties3 {
        AuthorizationSource: string;
        Environment: string;
        Account: string;
        SubscriptionPolices: string;
        HomeTenant: string;
        Tenants: string;
    }

    export interface Tenant {
        Id: string;
        TenantId: string;
        ExtendedProperties: ExtendedProperties4;
        TenantCategory: any;
        Country: any;
        CountryCode: any;
        Name: any;
        Domains: any[];
        DefaultDomain: any;
        TenantType: any;
        TenantBrandingLogoUrl: any;
    }

    export interface ExtendedProperties4 { }

    export interface ExtendedProperties5 { }
}

export namespace AzDomain {
    export type Root = Root2[]

export interface Root2 {
  Id: string
  TenantId: string
  ExtendedProperties: ExtendedProperties
  TenantCategory: string
  Country: any
  CountryCode: string
  Name: string
  Domains: string[]
  DefaultDomain: string
  TenantType: string
  TenantBrandingLogoUrl?: string
}

export interface ExtendedProperties {
  TenantBrandingLogoUrl?: string
  TenantCategory: string
  CountryCode: string
  DefaultDomain: string
  DisplayName: string
  TenantType: string
  Domains: string
  Directory: string
}

}