
/**
 * @license MIT
 * Copyright (c) 2024 Hoya Kim
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const PNG_SIG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
;
export class PngMetadata {
    static textDecoder = new TextDecoder();
    static textEncoder = new TextEncoder();
    static isPNG(data) {
        const signature = new Uint8Array(data.slice(0, 8));
        return signature.every((byte, index) => byte === PNG_SIG[index]);
    }
    static splitChunks(data) {
        const view = new DataView(data instanceof ArrayBuffer ? data : data.buffer);
        let offset = PNG_SIG.length;
        const chunks = [];
        while (offset < view.byteLength) {
            if (offset + 8 > view.byteLength)
                break;
            const size = view.getUint32(offset);
            offset += 4;
            const type = PngMetadata.textDecoder.decode(new Uint8Array(data.slice(offset, offset + 4)));
            offset += 4;
            if (offset + size + 4 > view.byteLength)
                break;
            const chunkData = new Uint8Array(data.slice(offset, offset + size));
            offset += size;
            const crc = view.getUint32(offset);
            offset += 4;
            chunks.push({ size, type, data: chunkData, crc });
        }
        return chunks;
    }
    static joinChunks(chunks) {
        const totalSize = PNG_SIG.length + chunks.reduce((sum, chunk) => sum + 12 + chunk.size, 0);
        const buffer = new ArrayBuffer(totalSize);
        const view = new DataView(buffer);
        const uint8Array = new Uint8Array(buffer);
        uint8Array.set(PNG_SIG, 0);
        let offset = PNG_SIG.length;
        for (const chunk of chunks) {
            view.setUint32(offset, chunk.size);
            offset += 4;
            uint8Array.set(PngMetadata.textEncoder.encode(chunk.type), offset);
            offset += 4;
            uint8Array.set(chunk.data, offset);
            offset += chunk.size;
            view.setUint32(offset, chunk.crc);
            offset += 4;
        }
        return buffer;
    }
    static createChunk(type, data) {
        const typeArray = PngMetadata.textEncoder.encode(type);
        const crc = PngMetadata.crc32(new Uint8Array([...typeArray, ...data]));
        return { size: data.length, type, data, crc };
    }
    static crc32(data) {
        let crc = -1;
        for (let i = 0; i < data.length; i++) {
            crc = (crc >>> 8) ^ PngMetadata.crcTable[(crc ^ data[i]) & 0xFF];
        }
        return (crc ^ -1) >>> 0;
    }
    static crcTable = (() => {
        const table = new Array(256);
        for (let i = 0; i < 256; i++) {
            let c = i;
            for (let j = 0; j < 8; j++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            table[i] = c;
        }
        return table;
    })();
}

window.PngMetadata = PngMetadata
