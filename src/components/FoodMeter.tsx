import { BreadIcon } from '@/components/BreadIcon';

const FoodMeter = ({ foodAmount = 4 }) => {
  const maxFood = Array(10).fill('');

  return (
    <div className="flex flex-col flex-wrap justify-between md:flex-row">
      <h4 className="mb-1 md:mb-0">Food</h4>
      <div className="flex">
        {maxFood.map((_, index) => {
          return (
            <BreadIcon
              isActive={index + 1 <= foodAmount}
              key={`BreadIcon_${index}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodMeter;
