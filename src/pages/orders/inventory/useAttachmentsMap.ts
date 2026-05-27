/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import { emptyVehicleAttachments, type VehicleAttachmentState } from './VehicleAttachments';

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const DOC_EXT = /\.(pdf|doc|docx|xls|xlsx)$/i;

export function useAttachmentsMap() {
  const [map, setMap] = useState<Record<string, VehicleAttachmentState>>({});

  const getAttachments = useCallback(
    (key: string) => map[key] ?? emptyVehicleAttachments(),
    [map],
  );

  const addImages = useCallback((key: string, files: FileList) => {
    const picked = Array.from(files).filter(f => IMAGE_TYPES.has(f.type));
    if (!picked.length) return;

    setMap(prev => {
      const current = prev[key] ?? emptyVehicleAttachments();
      const images = picked.map(f => ({
        id: `${key}-img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        previewUrl: URL.createObjectURL(f),
        size: f.size,
      }));
      return { ...prev, [key]: { ...current, images: [...current.images, ...images] } };
    });
  }, []);

  const addDocuments = useCallback((key: string, files: FileList) => {
    const picked = Array.from(files).filter(
      f => DOC_EXT.test(f.name) || f.type.includes('pdf') || f.type.includes('document') || f.type.includes('sheet'),
    );
    if (!picked.length) return;

    setMap(prev => {
      const current = prev[key] ?? emptyVehicleAttachments();
      const documents = picked.map(f => ({
        id: `${key}-doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        size: f.size,
      }));
      return { ...prev, [key]: { ...current, documents: [...current.documents, ...documents] } };
    });
  }, []);

  const removeImage = useCallback((key: string, id: string) => {
    setMap(prev => {
      const current = prev[key];
      if (!current) return prev;
      const removed = current.images.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return {
        ...prev,
        [key]: { ...current, images: current.images.filter(img => img.id !== id) },
      };
    });
  }, []);

  const removeDocument = useCallback((key: string, id: string) => {
    setMap(prev => {
      const current = prev[key];
      if (!current) return prev;
      return {
        ...prev,
        [key]: { ...current, documents: current.documents.filter(doc => doc.id !== id) },
      };
    });
  }, []);

  const clearAttachments = useCallback((key: string) => {
    setMap(prev => {
      const current = prev[key];
      if (!current) return prev;
      current.images.forEach(img => URL.revokeObjectURL(img.previewUrl));
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return {
    getAttachments,
    addImages,
    addDocuments,
    removeImage,
    removeDocument,
    clearAttachments,
  };
}
