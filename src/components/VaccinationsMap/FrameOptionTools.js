// @flow

export const FrameOptions = {
    FirstDose: "f",
    SecondDose: "c",
    ThirdDoseAndBoosters: "t"
};


export function frameOptionToLabel ( option: string ): string {

    switch ( option ) {
        case FrameOptions.FirstDose:
            return "1st dose";
        case FrameOptions.SecondDose:
            return "2nd dose"
        case FrameOptions.ThirdDoseAndBoosters:
            return "Booster or 3rd dose"
        default:
            return null;
    }

}  // frameOptionToLabel
