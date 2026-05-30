export type FrogAreaType = {
  x_axis: {
    min: number;
    max: number;
  };
  y_axis: {
    min: number;
    max: number;
  };
};

export type FrogStateType = 'idle' | 'catching' | 'caught' | 'finished';
