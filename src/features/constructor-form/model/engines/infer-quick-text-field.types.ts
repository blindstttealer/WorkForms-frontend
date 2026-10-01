export type InferredQuickTextField =
  | {
      kind: 'heading';
      text: string;
      level: 2 | 3 | 4;
    }
  | {
      kind: 'paragraph';
      text: string;
    };
