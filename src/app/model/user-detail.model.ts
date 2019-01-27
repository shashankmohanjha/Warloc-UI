export class UserDetail {
    pricingUsers: Array<PricingUser> = new Array<PricingUser>();
    roles: Array<UserRole> = new Array<UserRole>();
    avisCountries: Array<AvisCountry> = new Array<AvisCountry>();
    userManagementCommand: UserManagementCommand = new UserManagementCommand();
    corPermissions: Map<number, Map<number, string>> = new Map();
}

export class UserManagementCommand {
    id: number;
    action: string;
    name: string;
    extendedName: string;
    email: string;
    userPrincipalName: string;
    roleIds: Array<number> = new Array<number>();
}

export class PricingUser {
    id: number;
    name: string;
    extendedName: string;
    userPrincipalName: string;
    email: string;
    lastLoginDate: string;
    roleIds: Array<number> = new Array<number>();
    corPermission: Map<number, string> = new Map();
    action: string;
    isActive: boolean;
}

export class UserRole {
    id: number;
    extendedName: string;
}

export class AvisCountry {
    id: number;
    name: string;
}
