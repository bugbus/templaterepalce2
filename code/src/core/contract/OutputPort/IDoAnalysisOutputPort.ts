export interface IDoAnalysisOutputPort {
    onSuccess(result: string): void;
    onFailure(): void;
}