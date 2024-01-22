import { BreadIcon } from '@/components/BreadIcon';

const FoodMeter = ({ foodAmount = 4 }) => {
  const maxFood = Array(10).fill('');

  return (
    <div className="grid">
      {maxFood.map((_, index) => {
        return (
          <BreadIcon
            isActive={index + 1 <= foodAmount}
            key={`BreadIcon_${index}`}
          />
        );
      })}
    </div>
  );
};

export default FoodMeter;
