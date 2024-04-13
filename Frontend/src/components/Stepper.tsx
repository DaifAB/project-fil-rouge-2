import { Step } from '@/types/interfaces';
import { twMerge } from 'tailwind-merge';

interface Props {
  steps: number | string[] | Step[];
  step: number;
  className?: string;
}

function Stepper({ steps, step, className }: Props) {
  const activeStepClass = 'bg-primary text-white';
  const completedStepClass = 'text-primary border-2 border-primary';
  const inactiveStepClass = 'text-heavy-gray border-2 border-heavy-gray';

  const activeSeparatorClass = 'bg-primary';
  const inactiveSeparatorClass = 'bg-lightgray';
  const hiddenSeparatorClass = 'bg-transparent';

  const stepsList = typeof steps === 'number' ? [...Array(steps)] : steps;

  const getSeparatorsClassName = (currentStep: number) => {
    let leftSeparatorClassName = inactiveSeparatorClass;
    let rightSeparatorClassName = inactiveSeparatorClass;

    if (currentStep < step) {
      leftSeparatorClassName = activeSeparatorClass;
      rightSeparatorClassName = activeSeparatorClass;
    } else if (currentStep === step) {
      leftSeparatorClassName = activeSeparatorClass;
    }

    if (currentStep === 1) {
      leftSeparatorClassName = hiddenSeparatorClass;
    } else if (currentStep === stepsList.length) {
      rightSeparatorClassName = hiddenSeparatorClass;
    }

    return [leftSeparatorClassName, rightSeparatorClassName];
  };

  const getStepClassName = (currentStep: number) => {
    let stepClassName;

    if (currentStep === step) {
      stepClassName = activeStepClass;
    } else if (currentStep < step) {
      stepClassName = completedStepClass;
    } else {
      stepClassName = inactiveStepClass;
    }

    return stepClassName;
  };

  return (
    <>
      <div className={twMerge('flex justify-between my-10', className)}>
        {stepsList.map((_step, index) => {
          const stepClassName = getStepClassName(index + 1);

          let [leftSeparatorClassName, rightSeparatorClassName] =
            getSeparatorsClassName(index + 1);

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={twMerge(
                    `h-0.5 w-1/3 rounded-full`,
                    leftSeparatorClassName
                  )}
                />

                <div
                  className={twMerge(
                    'text-lg w-9 h-9 font-semibold flex justify-center items-center rounded-full mx-auto',
                    stepClassName
                  )}
                >
                  {index + 1}
                </div>

                <div
                  className={twMerge(
                    `h-0.5 w-1/3 rounded-full`,
                    rightSeparatorClassName
                  )}
                />
              </div>

              <div
                className={twMerge(
                  'text-heavy-gray font-semibold flex-1 text-center',
                  index + 1 <= step && 'text-primary'
                )}
              >
                {_step?.label || _step}
              </div>
            </div>
          );
        })}
      </div>
      {stepsList[step - 1]?.content}
    </>
  );
}

export default Stepper;
