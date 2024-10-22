"use client"
import {  displayMetadataVRM } from './metadataVRM'
import { ifMetadataVRM, ifMetadataVRMC } from './typesMeta'
import styles from "./metadataViewer.module.css";
import { useState } from 'react';

type tVRM = ifMetadataVRM | ifMetadataVRMC | null;


const loadVrmMetadataFromFile = async (file: File): Promise<tVRM> => {
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

            if (!json.extensions || !json.extensions.VRM) {
                if (!json.extensions.VRMC_vrm //vroid studio 
                ) {
                    return reject('No VRM extension found in the file');
                }
            }

            let vrmMeta: tVRM = null;

            if (json.extensions.VRM) {
                vrmMeta = json.extensions.VRM.meta;
            } else if (json.extensions.VRMC_vrm) {
                vrmMeta = json.extensions.VRMC_vrm.meta;
            }

            resolve(vrmMeta);
        };

        reader.onerror = (error) => {
            reject('Error reading file');
        };

        reader.readAsArrayBuffer(file);
    });
};
const VrmMetadataViewer = () => {
    const [vrmMeta, setVrmMeta] = useState<tVRM>(null);

    const [error, setError] = useState<any>(null);

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const result = await loadVrmMetadataFromFile(file);
                setVrmMeta(result);
                setError(null);
            } catch (err) {
                setError(err);
                setVrmMeta(null);
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
                    ) : (
                        !error && <p>No file uploaded or invalid VRM file.</p>
                    )
                }
            </div>


        </section>
    );
};

export default VrmMetadataViewer;