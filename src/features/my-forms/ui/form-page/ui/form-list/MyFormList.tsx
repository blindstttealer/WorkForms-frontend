import { FormListItem } from '../../../../model/multi-form-manager';
import { FC } from 'react';
import { MyFormListItem } from '../form-list-item/MyFormListItem';
import { FormListContainer, FormListGrid } from './styles';
import { observer } from 'mobx-react-lite';
interface MyFormListProps {
  currentFormId: string;
  onSwitchForm: (id: string) => void;
  onDeleteForm: (id: string) => void;
  onEditForm: (id: string, newText: string) => void;
  formList: FormListItem[];
}
export const MyFormList: FC<MyFormListProps> = observer(
  ({ onSwitchForm, currentFormId, onDeleteForm, onEditForm, formList }) => {
    return (
      <FormListContainer>
        <FormListGrid>
          {formList.map((form) => (
            <MyFormListItem
              key={form.id}
              id={form.id}
              title={form.name}
              currentFormId={currentFormId}
              onDeleteForm={onDeleteForm}
              onSwitchForm={onSwitchForm}
              onEditForm={onEditForm}
            />
          ))}
        </FormListGrid>
      </FormListContainer>
    );
  },
);
