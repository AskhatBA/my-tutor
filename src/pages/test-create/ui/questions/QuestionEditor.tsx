import type { Question } from '@/entities/test';
import { SingleChoiceEditor } from './SingleChoiceEditor';
import { MultipleChoiceEditor } from './MultipleChoiceEditor';
import { TextQuestionEditor } from './TextQuestionEditor';

interface QuestionEditorProps {
  value: Question;
  onChange: (next: Question) => void;
}

export function QuestionEditor({ value, onChange }: QuestionEditorProps) {
  switch (value.type) {
    case 'single-choice':
      return <SingleChoiceEditor value={value} onChange={onChange} />;
    case 'multiple-choice':
      return <MultipleChoiceEditor value={value} onChange={onChange} />;
    case 'text':
      return <TextQuestionEditor value={value} onChange={onChange} />;
  }
}
