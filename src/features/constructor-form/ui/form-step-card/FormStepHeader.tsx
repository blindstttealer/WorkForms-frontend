import { T } from '@admiral-ds/react-ui';
import { StepHeaderBlock } from './styles';
export type FormStepHeaderProps = {
  title: string;
  description?: string;
};
export function FormStepHeader({ title, description }: FormStepHeaderProps) {
  return (
    <StepHeaderBlock>
      <T font="Header/H6" as="h2">
        {title}
      </T>
      {description ? (
        <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p" style={{ marginTop: 6 }}>
          {description}
        </T>
      ) : null}
    </StepHeaderBlock>
  );
}
FormStepHeader.displayName = 'FormStepHeader';
