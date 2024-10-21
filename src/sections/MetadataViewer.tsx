"use client"
import { displayMetadataVRM, displayMetadataVRMC } from './metadataVRM'
import { ifMetadataVRM, ifMetadataVRMC } from './metadataVRM'
import styles from "./metadataViewer.module.css";
import { useState } from 'react';

type tVRM = ifMetadataVRM | null;
type tVRMC = ifMetadataVRMC | null;

interface ifMetadata {
    vrm: tVRM;
    vrmc: tVRMC;
}

const loadVrmMetadataFromFile = async (file: File): Promise<ifMetadata> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event.target) return;
            const arrayBuffer = event.target.result as ArrayBuffer;
            const dataView = new DataView(arrayBuffer);

            // Check if the file is a valid GLB (which .vrm files are)
            const magic = dataView.getUint32(0, true);
            if (magic !== 0x46546C67) { // 'glTF' magic number
                return reject('Invalid VRM file format');
            }

            // Extract JSON chunk (the first chunk in a GLB file is JSON)
            let offset = 12;
            const chunkLength = dataView.getUint32(offset, true);
            const chunkType = dataView.getUint32(offset + 4, true);

            if (chunkType !== 0x4E4F534A) { // 'JSON' in ASCII
                return reject('First chunk is not JSON');
            }

            // Extract the JSON chunk
            const jsonText = new TextDecoder().decode(new Uint8Array(arrayBuffer, offset + 8, chunkLength));
            const json = JSON.parse(jsonText);

            console.log(json, 'json');

            if (!json.extensions || !json.extensions.VRM) {
                if (!json.extensions.VRMC_vrm //vroid studio 
                ) {
                    return reject('No VRM extension found in the file');
                }
            }

            let vrmMeta: tVRM = null;
            let vrmcMeta: tVRMC = null;

            if (json.extensions.VRM) {
                console.log('hi VRM');
                vrmMeta = json.extensions.VRM.meta;
            } else if (json.extensions.VRMC_vrm) {
                vrmcMeta = json.extensions.VRMC_vrm.meta;
            }

            resolve({ vrm: vrmMeta, vrmc: vrmcMeta });
        };

        reader.onerror = (error) => {
            reject('Error reading file');
        };

        reader.readAsArrayBuffer(file);
    });
};
const VrmMetadataViewer = () => {
    const [vrmMeta, setVrmMeta] = useState<tVRM>(null);
    const [vrmcMeta, setVrmcMeta] = useState<tVRMC>(null);

    const [error, setError] = useState<any>(null);

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const result = await loadVrmMetadataFromFile(file);
                setVrmMeta(result.vrm);
                setVrmcMeta(result.vrmc);
                setError(null);
            } catch (err) {
                setError(err);
                setVrmMeta(null);
                setVrmcMeta(null);
            }
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles['upload-file']}>
                <h2>Upload VRM / VRMC File</h2>
                <input type="file" accept=".vrm" onChange={handleFileChange} />
            </div>

            {error && <div>Error: {error}</div>}
            <div className={styles['loaded-metadata']} >
                {
                    vrmMeta ? (
                        displayMetadataVRM(vrmMeta)
                    ) : vrmcMeta ? (
                        displayMetadataVRMC(vrmcMeta)
                    ) : (
                        !error && <p>No file uploaded or invalid VRM file.</p>
                    )
                }
            </div>


        </section>
    );
};

export default VrmMetadataViewer;