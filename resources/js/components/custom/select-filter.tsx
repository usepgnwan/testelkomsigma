import { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface FilterNumber {
    value: number;
    label: string;
};

const ListFilterNumber: FilterNumber[] = [ 
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];
const defaultOption = ListFilterNumber[0];
type SelectFilterProps = {
    value?: number;
    onChange?: (value : any) => void;
};
export default function SelectFilter({ value, onChange }: SelectFilterProps) {
    const [selectedOption, setSelectedOption] = useState<ListFilterNumber>(defaultOption);
   
    const customComponents = {
        IndicatorSeparator: () => null, // hilangkan garis pemisah (|)
    };
    const filterColors = (inputValue: string) => {
        return ListFilterNumber.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (
        inputValue: string,
        callback: (options: ListFilterNumber[]) => void
    ) => {
        setTimeout(() => {
            callback(filterColors(inputValue));
        }, 1000);
    };

    const handleChange = (option: any) => {
        setSelectedOption(option);
        if (onChange) onChange(option);  
    };

    return (
        <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions
            styles={{
                container: (provided) => ({ ...provided, width: '6rem' }),
                control: (provided) => ({ ...provided, borderRadius: '1rem' }),
            }}
            value={  selectedOption} 
            onChange={handleChange}
            components={customComponents}
        />
    )
}