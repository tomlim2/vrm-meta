export interface ifMetadataVRM {
    title: string;
    version: string;
    author: string;
    contactInformation: string;
    reference: string;
    texture: number;
    allowedUserName: string;
    violentUssageName: string;
    sexualUssageName: string;
    commercialUssageName: string;
    otherPermissionUrl: string;
    licenseName: string;
    otherLicenseUrl: string;
}

export interface ifMetadataVRMC {
    name: string;
    version: string;
    authors: string[];
    copyrightInformation: string;
    contactInformation: string;
    reference: string;
    thumbnailImage: number; // Index of the texture for the thumbnail
    licenseUrl: string;
    avatarPermission: "onlyAuthor" | "everyone";
    allowExcessivelyViolentUsage: boolean;
    allowExcessivelySexualUsage: boolean;
    commercialUsage: string;
    allowPoliticalOrReligiousUsage: boolean;
    creditNotation: "required" | "unnecessary";
    allowRedistribution: boolean;
    modification: "allow" | "disallow";
    otherLicenseUrl: string;
}