// @flow

import React from 'react';
import type { ComponentType } from 'react';
import BigNumber from 'components/BigNumber';

import type { Props } from './BigNumberBlock.types';

const BigNumberBlock: ComponentType<Props> = ({ data }: Props) => {
  return (
    <>
      <BigNumber
        caption="Total number of cases"
        number={data?.totalCases?.value ?? 0}
        percentageChange={5}
        subtext=""
      />
      <BigNumber
        caption="Number of people who have coronavirus now"
        number={data?.activeCases?.value ?? 0}
        percentageChange={0}
        subtext=""
      />
      <BigNumber
        caption="Number of people tested"
        number={data?.tested?.value ?? 0}
        percentageChange={124}
        subtext=""
      />
      <BigNumber
        caption="Number of people in hospital"
        number={data?.hospital?.value ?? 0}
        percentageChange={-23}
        subtext=""
      />
      <BigNumber
        caption="Number of people who have recovered"
        number={data?.recovered?.value ?? 0}
        percentageChange={0}
        subtext=""
      />
      <BigNumber
        caption="Number of people who have died"
        number={data?.deaths?.value ?? 0}
        percentageChange={20}
        subtext=""
      />
    </>
  );
};

export default BigNumberBlock;
