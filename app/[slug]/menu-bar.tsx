import BlurFade from "@/components/magicui/blur-fade";
import { Button } from '@/components/ui/button';

export type MenuButtonType = { label: string,
    icon: any,
    classes: string,
    visible: boolean,
    disabled?: boolean,
    onClick?: () => void,
    type?: 'button' | 'submit' 
}
const MenuBar = ({ buttons }: { buttons:MenuButtonType[]}) => {
    return (
        <div className='w-full bg-stone-800 p-2'>
            <div className="container m-auto flex gap-3 justify-end">
                {buttons.map((button, index) =>  {
                    if (!button.visible) return null;
                    return (
                    <BlurFade key={button.label} duration={.2} delay={0.25 + index  * 0.05} yOffset={-6}>
                        <Button 
                            onClick={ button.onClick }
                            className={ `flex gap-2 transition-all translate-y-[-6px] ${button.classes}}` }
                            type={ button.type ?? 'button' }
                            disabled={ button.disabled }
                            >
                            { <button.icon size='16' /> }
                            { button.label }
                        </Button>
                    </BlurFade>)
                })}
            </div>
        </div>
    )
}

    export default MenuBar;