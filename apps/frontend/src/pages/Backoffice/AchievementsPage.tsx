import { NoPaginationTableList } from '@/components/NoPaginationTableList'
import {
  createAchievement,
  deleteAchievement,
  getAllAchievementsWithIconMetadata,
  updateAchievement,
} from '@/services/achievementService'
import {
  AchievementCreate,
  AchievementDetailWithIconMetadata,
  AchievementUpdate,
  achievementTypeValues,
} from '@/types/achievementTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PencilEditIcon from '@/components/svg/PencilEditIcon'
import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { AchievementEditDialog } from '@/components/AchievementEditDialog'
import DefaultAchievementIcon from '@/assets/achievement.png'

const columns = (
  onEditClick: (achievement: AchievementDetailWithIconMetadata) => void,
  onDeleteClick: (achievement: AchievementDetailWithIconMetadata) => void
): ColumnDef<AchievementDetailWithIconMetadata>[] => [
  {
    accessorKey: 'icon',
    header: 'Icon',
    cell: ({ row }) => (
      <img
        src={row.original.icon?.url ?? DefaultAchievementIcon}
        alt="Achievement icon"
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'minimumValue', header: 'Minimum value to achieve' },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => achievementTypeValues(row.original.type),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const rowData = row.original

      return (
        <div className="flex items-center justify-center space-x-2">
          <Button type="button" variant={'outline'} onClick={() => onEditClick(rowData)}>
            <PencilEditIcon />
          </Button>
          <Button type="button" variant={'destructive'} onClick={() => onDeleteClick(rowData)}>
            <TrashIcon />
          </Button>
        </div>
      )
    },
  },
]

const columnVisibility = {
  description: false,
  minimumValue: false,
  type: false,
}

export default function AchievementsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementDetailWithIconMetadata | null>(null)

  const handleOpenEditDialog = (open: boolean) => {
    if (!open) resetAllVars()
  }

  const resetAllVars = () => {
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedAchievement(null)
  }

  const onEditClick = (achievement: AchievementDetailWithIconMetadata) => {
    setSelectedAchievement(achievement)
    setIsEditDialogOpen(true)
    // TODO navigate to edit page
  }

  const onCreateClick = () => {
    setSelectedAchievement(null)
    setIsEditDialogOpen(true)
  }

  // delete action
  const onDeleteClick = (achievement: AchievementDetailWithIconMetadata) => {
    setIsDeleteDialogOpen(true)
    setSelectedAchievement(achievement)
  }

  // creators
  const handleSave = (achievement: AchievementDetailWithIconMetadata, isCreate: boolean) => {
    if (isCreate) {
      handleAchievementCreation(achievement)
    }
    if (!isCreate) {
      handleAchievementUpdate(achievement)
    }
  }

  const handleAchievementCreation = (achievement: AchievementDetailWithIconMetadata) => {
    const id = achievement.icon?.id
    createAchievementMutation.mutate({
      name: achievement.name,
      description: achievement.description,
      minimumValue: achievement.minimumValue,
      type: achievement.type,
      icon: id ? { id } : null,
    })
  }

  const handleAchievementUpdate = (achievement: AchievementDetailWithIconMetadata) => {
    const id = achievement.icon?.id
    updateAchievementMutation.mutate({
      id: achievement.id,
      data: {
        name: achievement.name,
        description: achievement.description,
        minimumValue: achievement.minimumValue,
        type: achievement.type,
        icon: id ? { id } : null,
      },
    })
  }

  const handleAchievementDeletion = async () => {
    if (selectedAchievement) deleteAchievementMutation.mutate(selectedAchievement.id)
  }

  /** Queries */
  const queryClient = useQueryClient()

  const deleteAchievementMutation = useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_achievements'] })
    },
    onError: (error) => {
      console.error('Error deleting achievement:', error)
    },
    onSettled: () => resetAllVars(),
  })

  const updateAchievementMutation = useMutation({
    // mutationFn receives the variable passed to mutate()
    mutationFn: ({ id, data }: { id: string; data: AchievementUpdate }) =>
      updateAchievement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_achievements'] })
    },
    onError: (error) => {
      console.error('Error updating achievement:', error)
    },
    onSettled: () => resetAllVars(),
  })

  const createAchievementMutation = useMutation({
    mutationFn: (data: AchievementCreate) => createAchievement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_achievements'] })
    },
    onError: (error) => {
      console.error('Error creating achievement:', error)
    },
    onSettled: () => resetAllVars(),
  })

  const achievementsQuery = useQuery({
    queryKey: ['all_achievements'],
    queryFn: () => getAllAchievementsWithIconMetadata(),
  })

  // by type then by minimum value
  const sortedAchievements = useMemo(() => {
    const data = achievementsQuery.data
    if (!data) return undefined

    const sortedData = [...data].sort((a, b) => {
      const typeComparison = a.type.localeCompare(b.type)
      if (typeComparison !== 0) {
        return typeComparison
      }
      return a.minimumValue - b.minimumValue
    })

    return sortedData
  }, [achievementsQuery.data])

  return (
    <div>
      <NoPaginationTableList
        data={sortedAchievements}
        isLoading={achievementsQuery.isLoading}
        isError={achievementsQuery.isError}
        error={achievementsQuery.error}
        isSuccess={achievementsQuery.isSuccess}
        columnDefiniton={columns(onEditClick, onDeleteClick)}
        noResult={<div className="text-center">No achievements found</div>}
        onCreateClick={onCreateClick}
        columnVisibility={columnVisibility}
      />

      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        setOpen={resetAllVars}
        setDelete={handleAchievementDeletion}
      />

      <AchievementEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={handleOpenEditDialog}
        achievement={selectedAchievement}
        closeAndExecute={handleSave}
      />
    </div>
  )
}
