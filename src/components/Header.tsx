// React import not required in newer JSX setups
import { Group, Badge, Title } from '@mantine/core';
import { ConnectButton } from './ConnectButton';
import { NetworkDropdown } from './NetworkDropdown';
import { useAuthStore } from '../stores/authStore';

export function Header() {
  const { isConnected, isAdmin } = useAuthStore();

  return (
    <Group justify="space-between" w="100%" p="sm">
      <Group gap="sm">
        <Title order={4} c="blue">Conflux DevKit</Title>
        {isConnected && (
          <Badge
            size="xs"
            color={isAdmin ? 'red' : 'green'}
            variant="light"
          >
            {isAdmin ? 'Admin' : 'Developer'}
          </Badge>
        )}
      </Group>

      <Group gap="xs">
        <NetworkDropdown />
        <ConnectButton />
      </Group>
    </Group>
  );
}