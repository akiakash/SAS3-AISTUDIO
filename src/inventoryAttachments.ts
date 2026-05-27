/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import {
  emptyVehicleAttachments,
  type VehicleAttachmentState,
} from './VehicleAttachments';

export type AttachmentsMap = Record<number, VehicleAttachmentState>;

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const DOC_EXT = /\.(pdf|doc|docx|xls|xlsx)$/i;

export function useInventoryAttachments() {
  const [attachmentsMap, setAttachmentsMap] = useState<AttachmentsMap>({});

  const getAttachments = useCallback(
    (vehicleId: number) => attachmentsMap[vehicleId] ?? emptyVehicleAttachments(),
    [attachmentsMap],
  );

  const addImages = useCallback((vehicleId: number, files: FileList) => {
    const picked = Array.from(files).filter(f => IMAGE_TYPES.has(f.type));
    if (!picked.length) return;

    setAttachmentsMap(prev => {
      const current = prev[vehicleId] ?? emptyVehicleAttachments();
      const images = picked.map(f => ({
        id: `${vehicleId}-img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        previewUrl: URL.createObjectURL(f),
        size: f.size,
      }));
      return { ...prev, [vehicleId]: { ...current, images: [...current.images, ...images] } };
    });
  }, []);

  const addDocuments = useCallback((vehicleId: number, files: FileList) => {
    const picked = Array.from(files).filter(
      f => DOC_EXT.test(f.name) || f.type.includes('pdf') || f.type.includes('document') || f.type.includes('sheet'),
    );
    if (!picked.length) return;

    setAttachmentsMap(prev => {
      const current = prev[vehicleId] ?? emptyVehicleAttachments();
      const documents = picked.map(f => ({
        id: `${vehicleId}-doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        size: f.size,
      }));
      return { ...prev, [vehicleId]: { ...current, documents: [...current.documents, ...documents] } };
    });
  }, []);

  const removeImage = useCallback((vehicleId: number, id: string) => {
    setAttachmentsMap(prev => {
      const current = prev[vehicleId];
      if (!current) return prev;
      const removed = current.images.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return {
        ...prev,
        [vehicleId]: { ...current, images: current.images.filter(img => img.id !== id) },
      };
    });
  }, []);

  const removeDocument = useCallback((vehicleId: number, id: string) => {
    setAttachmentsMap(prev => {
      const current = prev[vehicleId];
      if (!current) return prev;
      return {
        ...prev,
        [vehicleId]: { ...current, documents: current.documents.filter(doc => doc.id !== id) },
      };
    });
  }, []);

  return { getAttachments, addImages, addDocuments, removeImage, removeDocument };
}
