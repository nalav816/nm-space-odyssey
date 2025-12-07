import SectionCard from "./SectionCard"

export default function Science({className} : {className?: string}){
    return (
        <SectionCard className = {"flex flex-col " + className} sectionName = "Science" iconUrl="/sprites/scienceIcon.png">
            <div className="flex-1 bg-blue-darkest/60 w-full flex justify-center items-center">
                <div className="text-center text-white"> Hire A Researcher <br/> And Keep Them In Employee's Quarters <br /> To Unlock Science </div>
            </div>
        </SectionCard>
    )
}