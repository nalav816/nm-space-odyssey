import { useState, useEffect } from "react"

export default function useSelect(isMouseOver: boolean) : [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
     const [isSelected, setIsSelected] = useState(false)

     useEffect(() => {
          const onClickAnywhere = (event: any) => {
               if (isSelected && !isMouseOver) {
                    setIsSelected(false)
               }
          }

          document.addEventListener("click", onClickAnywhere)
          return () => document.removeEventListener("click", onClickAnywhere)
     }, [isSelected, isMouseOver])

     return [isSelected, setIsSelected] 
}