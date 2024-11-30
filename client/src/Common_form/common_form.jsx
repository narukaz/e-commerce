import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger,SelectValue,SelectItem, SelectLabel, SelectGroup,SelectContent } from '@/components/ui/select';


import React from 'react'




function CommonForm({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
    isBtnDisabled,
  }) {

    function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";
  
      switch (getControlItem.componentType) {
        case "input":
          element = (
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,[getControlItem.name]: event.target.value,})}/>
          );
          break;

          case "textarea":
            element = (
              <Textarea
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.id}
                value={value}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [getControlItem.name]: event.target.value,
                  })
                }
              />
          );
          break;



          case 'select':
            element = (
              <Select onValueChange={(value)=> setFormData({
                ...formData, [getControlItem.name]: value
            })}
            value={value}>
                <SelectTrigger>
                  <SelectValue placeholder={getControlItem?.placeholder}>{value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {getControlItem?.options.map(option => <SelectItem value={option?.id}>{option?.label}</SelectItem>)}
                        </SelectGroup>
                </SelectContent>
              </Select>
            );
            break ;
      
        
  
        default:
          element = (
            <Textarea
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
          );
          break;
      }
  
      return element;
    }
  
    return (
      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="flex flex-col gap-3 ">
          {formControls.map((controlItem) => (
            <div className="grid w-full gap-1.5" key={controlItem.id}>
              <Label className="mb-1 font-semibold">{controlItem.label}</Label>
              {
              renderInputsByComponentType(controlItem)}
            </div>
          ))}
        </div>
        <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full cursor-pointer">
          {buttonText || "Submit"}
        </Button>
      </form>
    );
  }
  
  export default CommonForm;

