import { FC, FunctionComponent, SVGProps } from 'react';
import cl from './ConnectionItem.module.css';
import { useNavigate } from 'react-router-dom';
import { socketStore } from '../../../stores/socketStore';
import ReactWindowsIcon from '../../../assets/images/windowsIcon.svg?react';
import ReactLinuxIcon from '../../../assets/images/linuxIcon.svg?react';

interface IconComponents {
  [key: string]: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
}

interface ConnectionItemProps {
  ip: string;
  clientId: string;
}

const iconComponentsMap: IconComponents = {
  windows: ReactWindowsIcon,
  linux: ReactLinuxIcon,
};
interface DynamicIconComponentProps {
  iconName: keyof IconComponents;
  className: string;
}

function DynamicIconComponent({
  iconName,
  className,
}: DynamicIconComponentProps) {
  if (typeof iconName === 'string') {
    iconName = iconName.toLowerCase();
  }

  const IconComponent = iconComponentsMap[iconName];

  return IconComponent ? (
    <IconComponent className={className} />
  ) : (
    <span>Icon not found</span>
  );
}

const ConnectionItem: FC<ConnectionItemProps> = ({ ip, clientId }) => {
  const navigate = useNavigate();
  const platform = socketStore(
    (state) =>
      state.connections.find(
        (connection: { socketId: string | undefined }) =>
          connection.socketId == clientId,
      ).osInfo.platform,
  );

  return (
    <section
      className={cl.wrapper}
      onClick={() => {
        navigate(`/connections/${clientId}`);
      }}
    >
      <span>Ip: {ip}</span>
      <DynamicIconComponent iconName={platform} className={cl.svgImage} />
    </section>
  );
};

export default ConnectionItem;
