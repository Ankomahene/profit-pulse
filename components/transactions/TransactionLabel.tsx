import { ITransaction } from '@/types';
import { createClient } from '@/utils/supabase/client';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Loader,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface Props {
  transaction: ITransaction;
  updateTransactionState: (transaction: ITransaction) => void;
}
export function TransactionLabel({
  transaction,
  updateTransactionState,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(transaction.name);

  const handleUpdateLabel = async () => {
    if (name.trim() && name.trim() !== transaction.name) {
      const supabase = createClient();
      setIsLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .update({ name })
        .eq('id', transaction.id)
        .select();
      setIsLoading(false);

      if (error) {
        notifications.show({
          message:
            'There was an error updating the transaction label. Try again!',
        });
        return;
      }

      updateTransactionState(data[0]);
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <Box mt="xl" mb="sm">
          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Transaction Label"
            rightSectionWidth={70}
            rightSection={
              <Group gap={4}>
                <ActionIcon
                  size={32}
                  variant="light"
                  onClick={handleUpdateLabel}
                >
                  {isLoading ? <Loader size="xs" /> : <IconCheck />}
                </ActionIcon>

                <ActionIcon
                  size={32}
                  variant="light"
                  color="gray"
                  onClick={() => setIsEditing(false)}
                >
                  <IconX />
                </ActionIcon>
              </Group>
            }
          />
        </Box>
      ) : (
        <Group justify="space-between" align="flex-end" mt="xl" mb="sm">
          <Title order={3} c="dimmed">
            {transaction.name}
          </Title>

          <Button
            onClick={() => setIsEditing(true)}
            color="gray"
            variant="light"
            size="xs"
          >
            Edit
          </Button>
        </Group>
      )}
    </>
  );
}
