import {
  Stack,
  Title,
  Card,
  Text,
  Group,
  Badge,
  Button,
  SimpleGrid,
  ThemeIcon,
  Alert,
  Anchor,
} from '@mantine/core';
import {
  IconExternalLink,
  IconCurrencyDollar,
  IconArrowsExchange,
  IconInfoCircle,
  IconBridge,
} from '@tabler/icons-react';
import { useCurrentNetwork } from '../hooks/useDevKit';

interface ProtocolInfo {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  url: string;
  networks: Array<'local' | 'testnet' | 'mainnet'>;
  category: string;
  features: string[];
}

const protocols: ProtocolInfo[] = [
  {
    name: 'GinsenSwap',
    description: 'Leading DEX on Conflux for token swaps and liquidity mining',
    icon: IconArrowsExchange,
    color: 'blue',
    url: 'https://app.ginsenswap.com',
    networks: ['testnet', 'mainnet'],
    category: 'DEX',
    features: ['Token Swaps', 'Liquidity Pools', 'Yield Farming', 'Cross-chain Bridge'],
  },
  {
    name: 'Meson',
    description: 'Ultra-fast cross-chain bridge with atomic swaps',
    icon: IconBridge,
    color: 'green',
    url: 'https://meson.fi/conflux',
    networks: ['mainnet'],
    category: 'Bridge',
    features: ['Cross-chain Transfers', 'Atomic Swaps', 'Low Fees', '< 3 min Settlement'],
  },
];

export default function Protocols() {
  const { data: currentNetworkData } = useCurrentNetwork();
  const currentNetwork = currentNetworkData?.network || 'local';

  // Filter protocols available for current network
  const availableProtocols = protocols.filter(protocol => 
    protocol.networks.includes(currentNetwork as 'local' | 'testnet' | 'mainnet')
  );

  const getProtocolUrl = (protocol: ProtocolInfo) => {
    // Adjust URLs based on current network if needed
    if (protocol.name === 'GinsenSwap') {
      return currentNetwork === 'testnet' 
        ? 'https://testnet.ginsenswap.com' 
        : protocol.url;
    }
    return protocol.url;
  };

  const openProtocol = (protocol: ProtocolInfo) => {
    const url = getProtocolUrl(protocol);
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>DeFi Protocols</Title>
        <Badge size="lg" color={
          currentNetwork === 'mainnet' ? 'blue' : 
          currentNetwork === 'testnet' ? 'yellow' : 'gray'
        }>
          {currentNetwork.toUpperCase()}
        </Badge>
      </Group>

      {currentNetwork === 'local' && (
        <Alert icon={<IconInfoCircle size={16} />} color="blue">
          <Text size="sm">
            DeFi protocols are available on Conflux testnet and mainnet networks. 
            Switch to testnet or mainnet to access integrated protocols.
          </Text>
        </Alert>
      )}

      {availableProtocols.length > 0 && (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {availableProtocols.map((protocol) => (
            <Card key={protocol.name} withBorder padding="lg" radius="md" shadow="sm">
              <Stack gap="md">
                {/* Header */}
                <Group justify="space-between">
                  <Group gap="sm">
                    <ThemeIcon color={protocol.color} size="lg" variant="light">
                      <protocol.icon size={20} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600} size="lg">{protocol.name}</Text>
                      <Badge size="xs" color={protocol.color} variant="light">
                        {protocol.category}
                      </Badge>
                    </div>
                  </Group>
                  <IconExternalLink size={16} color="gray" />
                </Group>

                {/* Description */}
                <Text size="sm" c="dimmed">
                  {protocol.description}
                </Text>

                {/* Networks */}
                <Group gap="xs">
                  <Text size="xs" c="dimmed">Available on:</Text>
                  {protocol.networks.map((network) => (
                    <Badge
                      key={network}
                      size="xs"
                      color={
                        network === 'mainnet' ? 'blue' :
                        network === 'testnet' ? 'yellow' : 'gray'
                      }
                      variant={network === currentNetwork ? 'filled' : 'light'}
                    >
                      {network}
                    </Badge>
                  ))}
                </Group>

                {/* Features */}
                <div>
                  <Text size="xs" fw={500} mb="xs" c="dimmed">Key Features:</Text>
                  <Group gap="xs">
                    {protocol.features.map((feature) => (
                      <Badge key={feature} size="xs" color="gray" variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </Group>
                </div>

                {/* Network Status */}
                {currentNetwork === 'testnet' && protocol.name === 'GinsenSwap' && (
                  <Alert size="sm" color="yellow" radius="sm">
                    <Text size="xs">
                      🧪 Testnet version available with test tokens
                    </Text>
                  </Alert>
                )}
                
                {currentNetwork === 'mainnet' && protocol.name === 'Meson' && (
                  <Alert size="sm" color="green" radius="sm">
                    <Text size="xs">
                      🚀 Live on mainnet with real asset transfers
                    </Text>
                  </Alert>
                )}

                {/* Action Button */}
                <Button
                  fullWidth
                  leftSection={<protocol.icon size={16} />}
                  rightSection={<IconExternalLink size={14} />}
                  color={protocol.color}
                  onClick={() => openProtocol(protocol)}
                >
                  Open {protocol.name}
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Integration Info */}
      <Card withBorder padding="lg" radius="md" bg="gray.0">
        <Stack gap="md">
          <Group gap="sm">
            <IconInfoCircle size={20} color="blue" />
            <Text fw={500}>Protocol Integration</Text>
          </Group>
          
          <Text size="sm" c="dimmed">
            These protocols are integrated with Conflux Box to provide seamless access to DeFi services. 
            Your wallet connection will automatically work with these protocols when you switch networks.
          </Text>

          <Group gap="md">
            <div>
              <Text size="sm" fw={500} mb="xs">Supported Features:</Text>
              <Stack gap="xs">
                <Text size="xs" c="dimmed">• Automatic network detection</Text>
                <Text size="xs" c="dimmed">• Wallet connection sharing</Text>
                <Text size="xs" c="dimmed">• Transaction monitoring</Text>
                <Text size="xs" c="dimmed">• Cross-protocol compatibility</Text>
              </Stack>
            </div>
          </Group>
        </Stack>
      </Card>

      {/* Protocol Details by Network */}
      {currentNetwork !== 'local' && (
        <Card withBorder padding="lg" radius="md">
          <Stack gap="md">
            <Text fw={500}>Network-Specific Features</Text>
            
            {currentNetwork === 'testnet' && (
              <div>
                <Text size="sm" fw={500} mb="xs">Testnet Features:</Text>
                <Stack gap="xs">
                  <Text size="xs" c="dimmed">• GinsenSwap testnet with CFX test tokens</Text>
                  <Text size="xs" c="dimmed">• Risk-free testing environment</Text>
                  <Text size="xs" c="dimmed">• Full DEX functionality simulation</Text>
                  <Text size="xs" c="dimmed">• Developer-friendly for dApp testing</Text>
                </Stack>
              </div>
            )}

            {currentNetwork === 'mainnet' && (
              <div>
                <Text size="sm" fw={500} mb="xs">Mainnet Features:</Text>
                <Stack gap="xs">
                  <Text size="xs" c="dimmed">• GinsenSwap production with real CFX and tokens</Text>
                  <Text size="xs" c="dimmed">• Meson cross-chain bridge (ETH, BSC, Polygon, etc.)</Text>
                  <Text size="xs" c="dimmed">• Advanced yield farming opportunities</Text>
                  <Text size="xs" c="dimmed">• Professional trading tools and analytics</Text>
                </Stack>
              </div>
            )}
          </Stack>
        </Card>
      )}

      {/* Additional Protocol Links */}
      <Card withBorder padding="lg" radius="md">
        <Stack gap="md">
          <Text fw={500}>Explore More Protocols</Text>
          <Text size="sm" c="dimmed">
            Discover additional DeFi protocols in the Conflux ecosystem:
          </Text>
          <Group gap="md">
            <Anchor 
              href="https://confluxscan.io/tokens" 
              target="_blank" 
              size="sm"
            >
              ConfluxScan Tokens
            </Anchor>
            <Anchor 
              href="https://confluxnetwork.org/ecosystem" 
              target="_blank" 
              size="sm"
            >
              Conflux Ecosystem
            </Anchor>
            <Anchor 
              href="https://portal.confluxnetwork.org" 
              target="_blank" 
              size="sm"
            >
              Conflux Portal
            </Anchor>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}