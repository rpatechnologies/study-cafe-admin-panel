import React from 'react';
import Button from '../../../components/ui/button/Button';

export interface ArrayEditorProps<T> {
    value: T[];
    onChange: (value: T[]) => void;
    renderItem: (item: T, index: number, updateItem: (idx: number, patch: Partial<T>) => void) => React.ReactNode;
    defaultItem: T;
    addButtonLabel?: string;
}

export function ArrayEditor<T>({ value, onChange, renderItem, defaultItem, addButtonLabel = "Add Item" }: ArrayEditorProps<T>) {
    const handleAdd = () => {
        onChange([...value, defaultItem]);
    };

    const handleRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, patch: Partial<T>) => {
        const newVal = [...value];
        newVal[index] = { ...newVal[index], ...patch };
        onChange(newVal);
    };

    return (
        <div className="space-y-4">
            {value.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-white/[0.02]">
                    <div className="flex-grow space-y-4">
                        {renderItem(item, index, updateItem)}
                    </div>
                    <div className="flex items-start">
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="p-2 text-gray-500 hover:text-error-500 transition-colors"
                            title="Remove"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
                + {addButtonLabel}
            </Button>
        </div>
    );
}
