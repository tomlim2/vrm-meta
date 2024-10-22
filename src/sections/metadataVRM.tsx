import { ifMetadataVRM, ifMetadataVRMC } from "./typesMeta";
import styles from "./metadataViewer.module.css";

function renderLinkOrText(text: string | null | undefined) {
    if (!text) {
        return <span>{text}</span>;
    }

    const websitePattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (websitePattern.test(text)) {
        return <a className={styles['meta-link']} href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
    } else {
        return <span>{text}</span>;
    }
}

export function displayMetadataVRM(metadata: ifMetadataVRM | ifMetadataVRMC) {
    return (
        <>
            <h3 className={styles['meta-title']}>VRM Metadata (v0dx)</h3>
            <ul>
                {Object.entries(metadata).map(([key, value]) => (
                    <li key={key}>
                        <span className={styles['meta-key']}>{key}</span>: {renderLinkOrText(value)}
                    </li>
                ))}
            </ul>
        </>
    );
}