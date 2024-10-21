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

export function displayMetadataVRM(metadata: ifMetadataVRM) {
    return (
        <>
            <h3>VRM Metadata (v0dx)</h3>
            <ul>
                <li><span className={'name'}>title</span>: {metadata.title}</li>
                <li><span className={'name'}>version</span>: {metadata.version}</li>
                <li><span className={'name'}>author</span>: {metadata.author}</li>
                <li><span className={'name'}>contactInformation</span>: {metadata.contactInformation}</li>
                <li><span className={'name'}>reference</span>: {metadata.reference}</li>
                <li><span className={'name'}>texture</span>: {metadata.texture}</li>
                <li><span className={'name'}>allowedUserName</span>: {metadata.allowedUserName}</li>
                <li><span className={'name'}>violentUssageName</span>: {metadata.violentUssageName}</li>
                <li><span className={'name'}>sexualUssageName</span>: {metadata.sexualUssageName}</li>
                <li><span className={'name'}>commercialUssageName</span>: {metadata.commercialUssageName}</li>
                <li><span className={'name'}>otherPermissionUrl</span>: {metadata.otherPermissionUrl}</li>
                <li><span className={'name'}>licenseName</span>: {metadata.licenseName}</li>
                <li><span className={'name'}>otherLicenseUrl</span>: {metadata.otherLicenseUrl}</li>
            </ul>
        </>
    )
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
    commercialUsage: "allow" | "disallow";
    allowPoliticalOrReligiousUsage: boolean;
    creditNotation: "required" | "unnecessary";
    allowRedistribution: boolean;
    modification: "allow" | "disallow";
    otherLicenseUrl: string;
}

export function displayMetadataVRMC(metadata: ifMetadataVRMC) {
    return (<>
        <h3>VRMC Metadata (v1dx)</h3>
        <ul>
            <li><span className={'name'}>name:</span> {metadata.name}</li>
            <li><span className={'name'}>version:</span> {metadata.version}</li>
            <li><span className={'name'}>authors:</span> {metadata.authors.map((name, index) => (<span key={index}>{name}{index < metadata.authors.length - 1 ? ', ' : ''}</span>))}</li>
            <li><span className={'name'}>copyrightInformation:</span> {metadata.copyrightInformation}</li>
            <li><span className={'name'}>contactInformation:</span> {metadata.contactInformation}</li>
            <li><span className={'name'}>reference:</span> {metadata.reference}</li>
            <li><span className={'name'}>thumbnailImage:</span> {metadata.thumbnailImage}</li>
            <li><span className={'name'}>licenseUrl:</span> {metadata.licenseUrl}</li>
            <li><span className={'name'}>avatarPermission:</span> {metadata.avatarPermission}</li>
            <li><span className={'name'}>allowExcessivelyViolentUsage:</span> {metadata.allowExcessivelyViolentUsage}</li>
            <li><span className={'name'}>allowExcessivelySexualUsage:</span> {metadata.allowExcessivelySexualUsage}</li>
            <li><span className={'name'}>commercialUsage:</span> {metadata.commercialUsage}</li>
            <li><span className={'name'}>allowPoliticalOrReligiousUsage:</span> {metadata.allowPoliticalOrReligiousUsage}</li>
            <li><span className={'name'}>creditNotation:</span> {metadata.creditNotation}</li>
            <li><span className={'name'}>allowRedistribution:</span> {metadata.allowRedistribution}</li>
            <li><span className={'name'}>modification:</span> {metadata.modification}</li>
            <li><span className={'name'}>otherLicenseUrl:</span> {metadata.otherLicenseUrl}</li>
        </ul>
    </>)
}