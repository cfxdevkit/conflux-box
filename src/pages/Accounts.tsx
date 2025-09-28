import {
  Stack,
  Title,
  Card,
  Group,
  Text,
  Button,
  Badge,
  ActionIcon,
  CopyButton,
  Tooltip,
  SimpleGrid,
} from '@mantine/core';
import {
  IconWallet,
  IconCopy,
  IconCheck,
  IconPlus,
  IconRefresh,
} from '@tabler/icons-react';
import { useAccounts } from '../hooks/useDevKit';

export default function Accounts() {
  const { data: accountsData, isLoading, refetch } = useAccounts();
  const accounts = accountsData?.accounts || [];

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Accounts</Title>
        <Group>
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="light"
            onClick={() => refetch()}
            loading={isLoading}
          >
            Refresh
          </Button>
          <Button leftSection={<IconPlus size={16} />}>
            Create Account
          </Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
        {accounts?.map((account: any, index: number) => (
          <Card key={account.index || index} withBorder padding="lg" radius="md">
            <Stack gap="sm">
              <Group justify="space-between">
                <Group>
                  <IconWallet size={20} />
                  <Text fw={500}>Account {account.index || index}</Text>
                </Group>
                {account.isAdmin && <Badge size="sm">Admin</Badge>}
              </Group>

              <div>
                <Text size="xs" c="dimmed" mb={2}>
                  Core Address
                </Text>
                <Group gap="xs">
                  <Text size="sm" ff="monospace" style={{ wordBreak: 'break-all' }}>
                    {account.addresses?.core || account.address}
                  </Text>
                  <CopyButton value={account.addresses?.core || account.address}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon
                          color={copied ? 'teal' : 'gray'}
                          variant="subtle"
                          onClick={copy}
                          size="sm"
                        >
                          {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </div>

              {account.addresses?.evm && (
                <div>
                  <Text size="xs" c="dimmed" mb={2}>
                    eSpace Address
                  </Text>
                  <Group gap="xs">
                    <Text size="sm" ff="monospace" style={{ wordBreak: 'break-all' }}>
                      {account.addresses.evm}
                    </Text>
                    <CopyButton value={account.addresses.evm}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                          <ActionIcon
                            color={copied ? 'teal' : 'gray'}
                            variant="subtle"
                            onClick={copy}
                            size="sm"
                          >
                            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </div>
              )}

              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed">Balance</Text>
                  <Text size="sm" fw={500}>
                    {account.balance || '0'} CFX
                  </Text>
                </div>
                <Button variant="light" size="xs">
                  View Details
                </Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {(!accounts || accounts.length === 0) && !isLoading && (
        <Card withBorder padding="xl" radius="md">
          <Stack align="center" gap="sm">
            <IconWallet size={48} color="gray" />
            <Text c="dimmed">No accounts found</Text>
            <Button leftSection={<IconPlus size={16} />}>
              Create First Account
            </Button>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}