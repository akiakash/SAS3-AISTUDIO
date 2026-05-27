/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Image as ImageIcon, FileText, Upload, X, Paperclip } from 'lucide-react';

export type UploadedImage = {
  id: string;
  name: string;
  previewUrl: string;
  size: number;
};

export type UploadedDocument = {
  id: string;
  name: string;
  size: number;
};

export type VehicleAttachmentState = {
  images: UploadedImage[];
  documents: UploadedDocument[];
};

export function emptyVehicleAttachments(): VehicleAttachmentState {
  return { images: [], documents: [] };
}

type VehicleAttachmentsProps = {
  stockLabel: string;
  attachments: VehicleAttachmentState;
  onAddImages: (files: FileList) => void;
  onAddDocuments: (files: FileList) => void;
  onRemoveImage: (id: string) => void;
  onRemoveDocument: (id: string) => void;
  /** Compact layout for sheet row expand panels */
  compact?: boolean;
};

export default function VehicleAttachments({
  stockLabel,
  attachments,
  onAddImages,
  onAddDocuments,
  onRemoveImage,
  onRemoveDocument,
  compact,
}: VehicleAttachmentsProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`inventory-attachments${compact ? ' inventory-attachments--compact' : ''}`}>
      <div className="inventory-attachments-head">
        <Paperclip style={{ width: 13, height: 13, color: '#2563eb' }} />
        <span>Attachments — {stockLabel}</span>
      </div>

      <div className="inventory-upload-grid">
        <UploadZone
          kind="image"
          icon={<ImageIcon style={{ width: 22, height: 22 }} />}
          title="Images"
          hint="JPG, PNG, WEBP, GIF"
          count={attachments.images.length}
          onBrowse={() => imageInputRef.current?.click()}
          onFiles={onAddImages}
        />
        <UploadZone
          kind="document"
          icon={<FileText style={{ width: 22, height: 22 }} />}
          title="Documents"
          hint="PDF, DOC, DOCX, XLS, XLSX"
          count={attachments.documents.length}
          onBrowse={() => docInputRef.current?.click()}
          onFiles={onAddDocuments}
        />
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="inventory-upload-input"
        onChange={e => {
          if (e.target.files?.length) onAddImages(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={docInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword"
        multiple
        className="inventory-upload-input"
        onChange={e => {
          if (e.target.files?.length) onAddDocuments(e.target.files);
          e.target.value = '';
        }}
      />

      {(attachments.images.length > 0 || attachments.documents.length > 0) && (
        <div className="inventory-attachments-lists">
          {attachments.images.length > 0 && (
            <div className="inventory-attachment-list">
              <div className="inventory-attachment-list-title">
                <ImageIcon style={{ width: 12, height: 12 }} />
                Images ({attachments.images.length})
              </div>
              <div className="inventory-image-grid">
                {attachments.images.map(img => (
                  <div key={img.id} className="inventory-image-card">
                    <img src={img.previewUrl} alt={img.name} />
                    <div className="inventory-image-card-meta">
                      <span title={img.name}>{img.name}</span>
                      <small>{formatBytes(img.size)}</small>
                    </div>
                    <button type="button" className="inventory-attachment-remove" onClick={() => onRemoveImage(img.id)} title="Remove">
                      <X style={{ width: 12, height: 12 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {attachments.documents.length > 0 && (
            <div className="inventory-attachment-list">
              <div className="inventory-attachment-list-title">
                <FileText style={{ width: 12, height: 12 }} />
                Documents ({attachments.documents.length})
              </div>
              <ul className="inventory-doc-list">
                {attachments.documents.map(doc => (
                  <li key={doc.id}>
                    <FileText style={{ width: 14, height: 14, color: '#6366f1', flexShrink: 0 }} />
                    <span className="inventory-doc-name" title={doc.name}>{doc.name}</span>
                    <span className="inventory-doc-size">{formatBytes(doc.size)}</span>
                    <button type="button" className="inventory-attachment-remove" onClick={() => onRemoveDocument(doc.id)} title="Remove">
                      <X style={{ width: 12, height: 12 }} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function UploadZone({
  kind,
  icon,
  title,
  hint,
  count,
  onBrowse,
  onFiles,
}: {
  kind: 'image' | 'document';
  icon: React.ReactNode;
  title: string;
  hint: string;
  count: number;
  onBrowse: () => void;
  onFiles: (files: FileList) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`inventory-upload-zone inventory-upload-zone--${kind}`}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className={`inventory-upload-zone-icon inventory-upload-zone-icon--${kind}`}>{icon}</div>
      <div className="inventory-upload-zone-title">{title}</div>
      <div className="inventory-upload-zone-hint">{hint}</div>
      {count > 0 && <div className="inventory-upload-zone-count">{count} uploaded</div>}
      <button type="button" className="inventory-upload-btn" onClick={onBrowse}>
        <Upload style={{ width: 13, height: 13 }} />
        Choose files
      </button>
      <span className="inventory-upload-zone-or">or drag & drop</span>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
