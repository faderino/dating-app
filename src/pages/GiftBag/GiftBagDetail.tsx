import React from 'react';
import { Profile } from '../../types/profile';
import { RecipientData, RecipientDataItem } from './style';

type Props = { recipient: Profile | null };
const GiftBagDetail: React.FC<Props> = ({ recipient }) => {
  return (
    <RecipientData>
      <RecipientDataItem>
        <p>To:</p>
        <p>{recipient?.name}</p>
      </RecipientDataItem>
      <RecipientDataItem>
        <p>Phone:</p>
        <p>+62 82125067385</p>
      </RecipientDataItem>
      <RecipientDataItem>
        <p>City:</p>
        <p>{recipient?.location.city}</p>
      </RecipientDataItem>
      <RecipientDataItem>
        <p>Province:</p>
        <p>{recipient?.location.province}</p>
      </RecipientDataItem>
      <RecipientDataItem>
        <p>Region:</p>
        <p>{recipient?.location.region}</p>
      </RecipientDataItem>
      <RecipientDataItem>
        <p>Country:</p>
        <p>{recipient?.location.country}</p>
      </RecipientDataItem>
    </RecipientData>
  );
};

export default GiftBagDetail;
