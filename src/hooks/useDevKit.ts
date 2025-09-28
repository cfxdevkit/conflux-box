// DevKit hooks - Enhanced version with full API integration
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DevKitApiService } from '../services/api';

// Hook for DevKit status
export function useDevKitStatus() {
  return useQuery({
    queryKey: ['devkit-status'],
    queryFn: DevKitApiService.getDevKitStatus,
    refetchInterval: 5000, // Refresh every 5 seconds
  });
}

// Hook for public status (for non-authenticated users)
export function usePublicStatus() {
  return useQuery({
    queryKey: ['public-status'],
    queryFn: DevKitApiService.getPublicStatus,
    refetchInterval: 5000,
  });
}

// Hook for accounts
export function useAccounts() {
  return useQuery({
    queryKey: ['devkit-accounts'],
    queryFn: DevKitApiService.getAllAccounts,
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}

// Hook for specific account
export function useAccount(index: number) {
  return useQuery({
    queryKey: ['devkit-account', index],
    queryFn: () => DevKitApiService.getAccount(index),
    enabled: index >= 0,
    refetchInterval: 10000,
  });
}

// Hook for account balance
export function useAccountBalance(index: number) {
  return useQuery({
    queryKey: ['devkit-balance', index],
    queryFn: () => DevKitApiService.getAccountBalance(index),
    enabled: index >= 0,
    refetchInterval: 10000,
  });
}

// Mutations for node control
export function useStartNode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.startNode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
      queryClient.invalidateQueries({ queryKey: ['public-status'] });
    },
  });
}

export function useStopNode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.stopNode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
      queryClient.invalidateQueries({ queryKey: ['public-status'] });
    },
  });
}

// Mutations for mining control
export function useStartMining() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.startMining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

export function useStopMining() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.stopMining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

export function useSetMiningInterval() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.setMiningInterval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

export function useMineBlocks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.mineBlocks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

// Mutations for contract deployment
export function useDeployContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      abi,
      bytecode,
      args = [],
      chain = 'core' as 'core' | 'evm',
      accountIndex = 0,
    }: {
      abi: any;
      bytecode: string;
      args?: any[];
      chain?: 'core' | 'evm';
      accountIndex?: number;
    }) => DevKitApiService.deployContract(abi, bytecode, args, chain, accountIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

// Mutations for transactions
export function useSendTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      to,
      value,
      data,
      chain = 'core' as 'core' | 'evm',
      accountIndex = 0,
    }: {
      to: string;
      value: string;
      data?: string;
      chain?: 'core' | 'evm';
      accountIndex?: number;
    }) => DevKitApiService.sendTransaction(to, value, data, chain, accountIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

// Mutations for contract interactions
export function useReadContract() {
  return useMutation({
    mutationFn: ({
      address,
      abi,
      method,
      args = [],
      chain = 'core' as 'core' | 'evm',
    }: {
      address: string;
      abi: any;
      method: string;
      args?: any[];
      chain?: 'core' | 'evm';
    }) => DevKitApiService.readContract(address, abi, method, args, chain),
  });
}

export function useWriteContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      address,
      abi,
      method,
      args = [],
      chain = 'core' as 'core' | 'evm',
      accountIndex = 0,
    }: {
      address: string;
      abi: any;
      method: string;
      args?: any[];
      chain?: 'core' | 'evm';
      accountIndex?: number;
    }) => DevKitApiService.writeContract(address, abi, method, args, chain, accountIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

// Network management hooks
export function useCurrentNetwork() {
  return useQuery({
    queryKey: ['devkit-network'],
    queryFn: DevKitApiService.getCurrentNetwork,
  });
}

export function useSwitchNetwork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (network: 'local' | 'testnet' | 'mainnet') =>
      DevKitApiService.switchNetwork(network),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-network'] });
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
      queryClient.invalidateQueries({ queryKey: ['devkit-accounts'] });
    },
  });
}

// Hook for updating development settings
export function useUpdateDevSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: {
      devBlockIntervalMs?: number;
      devPackTxImmediately?: boolean;
    }) => DevKitApiService.updateDevSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
    },
  });
}

// Hook for signing with DevKit account
export function useSignWithDevKitAccount() {
  return useMutation({
    mutationFn: ({
      accountIndex,
      message,
      chain = 'core' as 'core' | 'evm',
    }: {
      accountIndex: number;
      message: string;
      chain?: 'core' | 'evm';
    }) => DevKitApiService.signWithDevKitAccount(accountIndex, message, chain),
  });
}

// Hook for getting contract information
export function useContractInfo(address: string, chain: 'core' | 'evm' = 'core') {
  return useQuery({
    queryKey: ['contract-info', address, chain],
    queryFn: () => DevKitApiService.getContractInfo(address, chain),
    enabled: !!address,
  });
}

// Hook for transaction history
export function useTransactionHistory(
  accountIndex?: number,
  chain: 'core' | 'evm' = 'core',
  limit = 50
) {
  return useQuery({
    queryKey: ['transaction-history', accountIndex, chain, limit],
    queryFn: () => DevKitApiService.getTransactionHistory(accountIndex, chain, limit),
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}

// Hook for network statistics
export function useNetworkStats() {
  return useQuery({
    queryKey: ['network-stats'],
    queryFn: DevKitApiService.getNetworkStats,
    refetchInterval: 5000, // Refresh every 5 seconds
  });
}

// Hook for resetting development environment
export function useResetDevEnvironment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DevKitApiService.resetDevEnvironment,
    onSuccess: () => {
      // Invalidate all caches after reset
      queryClient.invalidateQueries();
    },
  });
}

// Hook for advanced transaction sending
export function useSendAdvancedTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      to,
      value,
      data,
      chain = 'core' as 'core' | 'evm',
      accountIndex = 0,
      gasLimit,
      gasPrice,
    }: {
      to: string;
      value: string;
      data?: string;
      chain?: 'core' | 'evm';
      accountIndex?: number;
      gasLimit?: string;
      gasPrice?: string;
    }) => DevKitApiService.sendAdvancedTransaction(to, value, data, chain, accountIndex, gasLimit, gasPrice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devkit-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['devkit-status'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-history'] });
    },
  });
}