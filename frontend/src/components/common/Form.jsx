
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {



    function renderInputsByComponentType(controlItem){
        let element = null;
        let value = formData[controlItem.name] || "";





        switch (controlItem.componentType) {
            case 'input':
                        element = <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={({target}) => setFormData({...formData, [controlItem.name] : target.value,})}
                        ></Input>
                break;

            case 'select':
                    element = (
                        <Select onValueChange={(value)=> setFormData({
                            ...formData, [controlItem.name]: value
                        })}    value={value}>
                            
                            <SelectTrigger className='w-full'>
                            <SelectValue  placeholder={controlItem.label}/>
                            <SelectContent>
                               
                                    
                                    {controlItem.options &&
                                     controlItem.options.length > 0 ?
                                     controlItem.options
                                     .map(optionItem => {
                                        return(<SelectItem key= {optionItem.id} value = {optionItem.id}>{optionItem.label}</SelectItem>)})
                                     : null
                                    }
                                    
                                
                                </SelectContent>
                            
                            </SelectTrigger>
                        </Select>
                    )
            break;

            case 'textarea':
                element = <textarea 
                name={controlItem.name}
                placeholder={controlItem.placeholder}
                id={controlItem.id}
                value={value}
                onChange={({target}) => setFormData({...formData, [controlItem.name] : target.value,})}
                />
            break;
        
            default:
                element = <input
                name={controlItem.name}
                placeholder={controlItem.placeholder}
                id={controlItem.name}
                type={controlItem.type}
                value={value}
                onChange={({target}) => setFormData({...formData, [controlItem.name] : target.value,})}
                ></input>
                break;
        }
        return element;

    }


  return (
   <form onSubmit={onSubmit}>
    <div className='flex flex-col gap-3'>
                {
                    formControls.map(controlItem => <div className='grid w-full gap-1.5' key={controlItem.name}>
                        <label className='mb-1'>{controlItem.label}</label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div> )
                }
    </div>
    <Button type='submit' className='mt-2 w-full'>{buttonText || 'submit'}</Button>

   </form>
  )
}

export default CommonForm
