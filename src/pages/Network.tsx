import {
  Stack,
  Title,
  Card,
  Text,
  Group,
  Badge,
  Button,
  // Switch not used here
  Grid,
} from '@mantine/core';
import {
  IconRefresh,
} from '@tabler/icons-react';
// type NetworkType not used here
import { NodeControlPanel } from '../components/NodeControlPanel';
import { useAutoDevKitStatus, useCurrentNetwork, useBlockNumbers } from '../hooks/useDevKit';

export default function Network() {
  const { data: devkitStatus, refetch } = useAutoDevKitStatus();
  const { data: currentNetworkData, refetch: refetchNetwork } = useCurrentNetwork();
  const { data: blockNumbers, refetch: refetchBlockNumbers } = useBlockNumbers(currentNetworkData?.network === 'local');

  const currentNetwork = currentNetworkData?.network || 'local';
  
  // Use RPC block numbers if backend doesn't provide them
  const coreBlockNumber = devkitStatus?.network?.blockNumber ?? blockNumbers?.core ?? '---';
  const evmBlockNumber = devkitStatus?.network?.evmBlockNumber ?? blockNumbers?.evm ?? '---';

  const handleRefreshStatus = () => {
    refetch();
    refetchNetwork();
    refetchBlockNumbers();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Node Control</Title>
        <Button
          leftSection={<IconRefresh size={16} />}
          variant="light"
          onClick={handleRefreshStatus}
        >
          Refresh Status
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack gap="md">
            <Card withBorder padding="lg" radius="md">
              <Group justify="space-between" mb="md">
                <Text fw={500}>Core Space</Text>
                <Badge color={devkitStatus?.running ? "green" : "gray"}>
                  {devkitStatus?.running ? "Active" : "Inactive"}
                </Badge>
              </Group>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text size="sm">Chain ID</Text>
                  <Text size="sm" ff="monospace">{devkitStatus?.network?.chainId || "2029"}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">RPC Endpoint</Text>
                  <Text size="sm" ff="monospace">
                    {currentNetwork === 'local'
                      ? `http://localhost:${devkitStatus?.config?.ports?.jsonrpcHttp || "12537"}`
                      : currentNetwork === 'testnet'
                        ? "https://test.confluxrpc.com"
                        : "https://main.confluxrpc.com"}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Block Number</Text>
                  <Text size="sm" ff="monospace">{coreBlockNumber}</Text>
                </Group>
              </Stack>
            </Card>

            <Card withBorder padding="lg" radius="md">
              <Group justify="space-between" mb="md">
                <Text fw={500}>eSpace (EVM)</Text>
                <Badge color={devkitStatus?.running ? "green" : "gray"}>
                  {devkitStatus?.running ? "Active" : "Inactive"}
                </Badge>
              </Group>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text size="sm">Chain ID</Text>
                  <Text size="sm" ff="monospace">{devkitStatus?.network?.evmChainId || "2030"}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">RPC Endpoint</Text>
                  <Text size="sm" ff="monospace">
                    {currentNetwork === 'local'
                      ? `http://localhost:${devkitStatus?.config?.ports?.jsonrpcHttpEth || "8545"}`
                      : currentNetwork === 'testnet'
                        ? "https://evmtestnet.confluxrpc.com"
                        : "https://evm.confluxrpc.com"}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Block Number</Text>
                  <Text size="sm" ff="monospace">{evmBlockNumber}</Text>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NodeControlPanel
            currentMiningStatus={devkitStatus?.mining}
            nodeRunning={devkitStatus?.running || false}
            networkType={currentNetwork}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}