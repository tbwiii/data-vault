import { ReactElement } from "react";

type MetadataItemType = {
    label: string;
    value: string | null;
    icon: ReactElement;
    input?: ReactElement | null;
};

const Item = ({ label, value, icon }: { label: string, value: string | null, icon: ReactElement }) => {
    return (
        <li className='flex gap-2 ms-center items-center'>
            {icon}
            <div>{label}:</div>
            <div>{value}</div>
        </li>
    );
}

const Meta = ({ editing, metadataArr, className }: { editing: boolean, metadataArr: MetadataItemType[], className: string }) => {
    return (
        <ul className={`grid gap-4 ${className}`}>
            {metadataArr.map((m: MetadataItemType) => (
                editing && m.input ? m.input : <Item key={m.label} {...m} />
            ))}
        </ul>
    );
}

export default Meta;