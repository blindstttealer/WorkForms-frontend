import { useState } from 'react';
export const useCreateFormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formName, setFormName] = useState('');
  const [formNameError, setFormNameError] = useState('');
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setIsModalVisible(false);
    setFormName('');
    setFormNameError('');
  };
  const updateFormName = (name: string) => {
    setFormName(name);
    if (formNameError) setFormNameError('');
  };
  const validateFormName = (): boolean => {
    if (!formName.trim()) {
      setFormNameError('Название формы не может быть пустым');
      return false;
    }
    return true;
  };
  return {
    isModalVisible,
    formName,
    formNameError,
    openModal,
    closeModal,
    updateFormName,
    validateFormName,
  };
};
