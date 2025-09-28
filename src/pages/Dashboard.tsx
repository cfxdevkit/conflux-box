import {
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Title,
  SimpleGrid,
  ThemeIcon,
  Progress,
  Button,
  Alert,
  Divider
} from '@mantine/core';
import {
  IconWallet,
  IconNetwork,
  IconCode,
  IconActivity,
  IconRefresh,
  IconPlayerPlay,
  IconPlayerStop,
  IconAlertCircle
} from '@tabler/icons-react';
import { useDevKitStatus, useCurrentNetwork, useStartNode, useStopNode } from '../hooks/useDevKit';

export default function Dashboard() {
  const { data: status, isLoading, refetch } = useDevKitStatus();
  const { data: currentNetworkData } = useCurrentNetwork();
  const startNodeMutation = useStartNode();
  const stopNodeMutation = useStopNode();

  const currentNetwork = currentNetworkData?.network || 'local';
  const nodeRunning = status?.running || false;

  const stats = [
    {
      title: 'Node Status',
      value: nodeRunning ? 'Running' : 'Stopped',
      icon: IconActivity,
      color: nodeRunning ? 'green' : 'red',
    },
    {
      title: 'Active Accounts',
      value: status?.accounts || 0,
      icon: IconWallet,
      color: 'blue',
    },
    {
      title: 'Mining Status',
      value: status?.mining?.isRunning ? 'Active' : 'Inactive',
      icon: IconCode,
      color: status?.mining?.isRunning ? 'green' : 'gray',
    },
    {
      title: 'Blocks Mined',
      value: status?.mining?.blocksMined || 0,
      icon: IconNetwork,
      color: 'orange',
    },
  ];

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Dashboard</Title>
        <Button
          leftSection={<IconRefresh size={16} />}
          variant="light"
          onClick={() => refetch()}
          loading={isLoading}
        >
          Refresh
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {stats.map((stat) => (
          <Card key={stat.title} withBorder padding="lg" radius="md">
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon color={stat.color} variant="light" size={38}>
                <stat.icon size={20} stroke={1.5} />
              </ThemeIcon>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between" mb="md">
              <Title order={4}>Network Information</Title>
              <Badge color={currentNetwork === 'local' ? 'green' : currentNetwork === 'testnet' ? 'yellow' : 'blue'}>
                {currentNetwork.toUpperCase()}
              </Badge>
            </Group>

            <Stack gap="sm">
              <Group justify="space-between">
                <Text>Chain ID (Core)</Text>
                <Badge variant="light">{status?.config?.chainId || '2029'}</Badge>
              </Group>
              <Group justify="space-between">
                <Text>Chain ID (eSpace)</Text>
                <Badge variant="light">{status?.config?.evmChainId || '2030'}</Badge>
              </Group>
              <Group justify="space-between">
                <Text>Core RPC</Text>
                <Text size="sm" c="dimmed" style={{ fontFamily: 'monospace' }}>
                  {currentNetwork === 'local'
                    ? status?.rpcUrls?.core || 'http://localhost:12537'
                    : currentNetwork === 'testnet'
                      ? 'https://test.confluxrpc.com'
                      : 'https://main.confluxrpc.com'
                  }
                </Text>
              </Group>
              <Group justify="space-between">
                <Text>eSpace RPC</Text>
                <Text size="sm" c="dimmed" style={{ fontFamily: 'monospace' }}>
                  {currentNetwork === 'local'
                    ? status?.rpcUrls?.evm || 'http://localhost:8545'
                    : currentNetwork === 'testnet'
                      ? 'https://evmtestnet.confluxrpc.com'
                      : 'https://evm.confluxrpc.com'
                  }
                </Text>
              </Group>
            </Stack>

            {currentNetwork === 'local' && (
              <>
                <Divider my="md" />
                <Group justify="space-between">
                  <Text fw={500}>Local Node Control</Text>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      leftSection={<IconPlayerPlay size={14} />}
                      color="green"
                      variant={nodeRunning ? "light" : "filled"}
                      disabled={nodeRunning || startNodeMutation.isPending}
                      onClick={() => startNodeMutation.mutate()}
                      loading={startNodeMutation.isPending}
                    >
                      {nodeRunning ? 'Running' : 'Start Node'}
                    </Button>
                    <Button
                      size="xs"
                      leftSection={<IconPlayerStop size={14} />}
                      color="red"
                      disabled={!nodeRunning || stopNodeMutation.isPending}
                      onClick={() => stopNodeMutation.mutate()}
                      loading={stopNodeMutation.isPending}
                    >
                      Stop Node
                    </Button>
                  </Group>
                </Group>
              </>
            )}

            {currentNetwork !== 'local' && (
              <>
                <Divider my="md" />
                <Alert icon={<IconAlertCircle size={16} />} color="blue" size="sm">
                  <Text size="sm">
                    Connected to remote {currentNetwork} network. RPC health monitoring available.
                  </Text>
                </Alert>
              </>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="lg" radius="md">
            <Title order={4} mb="md">System Health</Title>
            <Stack gap="md">
              <div>
                <Group justify="space-between" mb={5}>
                  <Text size="sm">Backend API</Text>
                  <Text size="sm" c={status ? 'green' : 'red'}>
                    {status ? 'Online' : 'Offline'}
                  </Text>
                </Group>
                <Progress
                  value={status ? 100 : 0}
                  color={status ? 'green' : 'red'}
                  size="sm"
                />
              </div>

              <div>
                <Group justify="space-between" mb={5}>
                  <Text size="sm">WebSocket</Text>
                  <Text size="sm" c={status ? 'green' : 'gray'}>
                    {status ? 'Connected' : 'Disconnected'}
                  </Text>
                </Group>
                <Progress
                  value={status ? 100 : 0}
                  color={status ? 'green' : 'gray'}
                  size="sm"
                />
              </div>

              {currentNetwork === 'local' && (
                <>
                  <div>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">Core Chain</Text>
                      <Text size="sm" c={nodeRunning ? 'green' : 'gray'}>
                        {nodeRunning ? 'Running' : 'Stopped'}
                      </Text>
                    </Group>
                    <Progress
                      value={nodeRunning ? 100 : 0}
                      color={nodeRunning ? 'green' : 'gray'}
                      size="sm"
                    />
                  </div>

                  <div>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">eSpace Chain</Text>
                      <Text size="sm" c={nodeRunning ? 'green' : 'gray'}>
                        {nodeRunning ? 'Running' : 'Stopped'}
                      </Text>
                    </Group>
                    <Progress
                      value={nodeRunning ? 100 : 0}
                      color={nodeRunning ? 'green' : 'gray'}
                      size="sm"
                    />
                  </div>
                </>
              )}

              {currentNetwork !== 'local' && (
                <>
                  <div>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">Core RPC</Text>
                      <Text size="sm" c="blue">
                        Remote Network
                      </Text>
                    </Group>
                    <Progress
                      value={100}
                      color="blue"
                      size="sm"
                    />
                  </div>

                  <div>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">eSpace RPC</Text>
                      <Text size="sm" c="blue">
                        Remote Network
                      </Text>
                    </Group>
                    <Progress
                      value={100}
                      color="blue"
                      size="sm"
                    />
                  </div>
                </>
              )}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}