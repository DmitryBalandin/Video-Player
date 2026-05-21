import { Typography } from 'antd';

const TitleModal: React.FC = () => {
  return (
    <Typography.Title
      level={5}
      style={{
        margin: 0,
        textTransform: 'uppercase',
      }}
    >
      Player
    </Typography.Title>
  );
};

export default TitleModal;
