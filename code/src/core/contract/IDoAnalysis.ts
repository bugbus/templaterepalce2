import{IDoAnalysisOutputPort} from "./OutputPort/IDoAnalysisOutputPort"
export interface IDoAnalysis {
    execute(input: string, data: Array<Array<string>>, outputPort: IDoAnalysisOutputPort): void;
}