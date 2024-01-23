import { BreadIcon } from '@/components/BreadIcon';

const FoodMeter = ({ foodAmount = 4 }) => {
  const maxFood = Array(10).fill('');

  return (
    <div className="flex-wrap-row flex items-center justify-between p-2 ">
      <p>Food</p>
      <div className="flex-wrap-row flex ">
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
