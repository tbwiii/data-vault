import { ReactElement } from "react";

type MetadataItemType = {
    label: string;
    value: string | null;
    icon: ReactElement;
    input?: ReactElement | null;
};

const Item = ({ label, value }: { label: string, value: string | null }) => {
    return (
        <>
            <div>{label}:</div>
            <div>{value}</div>
        </>
    );
}

const Meta = ({ editing, metadataArr, className }: { editing: boolean, metadataArr: MetadataItemType[], className: string }) => {
    return (
        <ul className={`grid gap-4 ${className}`}>
            {metadataArr.map((m: MetadataItemType) => (
                <li className='flex gap-2 ms-center items-center'>
                    {m.icon}
                    {editing && m.input ? m.input : <Item key={m.label} {...m} />}
                </li>
            ))}
        </ul>
    );
}

export default Meta;