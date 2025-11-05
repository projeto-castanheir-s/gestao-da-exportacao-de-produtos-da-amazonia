'use client';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { id: 1, label: 'Oferta', status: 'oferta' },
  { id: 2, label: 'Match', status: 'match' },
  { id: 3, label: 'Seleção de Parceiros', status: 'parceiros' },
  { id: 4, label: 'Contratações', status: 'contratacoes' },
  { id: 5, label: 'Exportação Concluída', status: 'concluida' }
];

export default function StepTracker({ currentStatus = 'oferta' }) {
  const getCurrentStepIndex = () => {
    const statusMap = {
      'ABERTA': 0,
      'MATCHED': 1,
      'PARTNERS_CONFIRMED': 2,
      'IN_PROGRESS': 3,
      'COMPLETED': 4
    };
    return statusMap[currentStatus] ?? 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-menuGreen transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-menuGreen text-white scale-110'
                      : isCurrent
                      ? 'bg-accent text-menuGreen scale-125 shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={24} className="animate-[fadeIn_0.3s_ease-in-out]" />
                  ) : (
                    <Circle size={24} fill={isCurrent ? 'currentColor' : 'none'} />
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-xs sm:text-sm font-medium transition-colors ${
                      isCompleted || isCurrent
                        ? 'text-menuGreen'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
