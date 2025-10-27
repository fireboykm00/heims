import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { MaintenanceRecord, Equipment } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function MaintenancePage() {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);

  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({
    type: 'ROUTINE',
    status: 'COMPLETED',
    maintenanceDate: new Date().toISOString().split('T')[0],
  });
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [recordsRes, equipmentRes] = await Promise.all([
        api.getMaintenanceRecords(),
        api.getEquipment(),
      ]);
      setRecords(recordsRes.data);
      setEquipment(equipmentRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedEquipment = selectedEquipmentId
        ? equipment.find(eq => eq.equipmentId === selectedEquipmentId)
        : undefined;
      const data = { ...formData, equipment: selectedEquipment } as MaintenanceRecord;

      if (editingRecord?.recordId) {
        await api.updateMaintenanceRecord(editingRecord.recordId, data);
      } else {
        await api.createMaintenanceRecord(data);
      }
      
      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Failed to save record:', error);
      alert('Failed to save maintenance record. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this maintenance record?')) {
      try {
        await api.deleteMaintenanceRecord(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete record:', error);
      }
    }
  };

  const handleEdit = (record: MaintenanceRecord) => {
    setEditingRecord(record);
    setFormData({
      type: record.type,
      status: record.status,
      maintenanceDate: record.maintenanceDate,
      description: record.description,
      cost: record.cost,
      performedBy: record.performedBy,
      nextScheduledDate: record.nextScheduledDate,
    });
    setSelectedEquipmentId(record.equipment?.equipmentId);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingRecord(null);
    setFormData({
      type: 'ROUTINE',
      status: 'COMPLETED',
      maintenanceDate: new Date().toISOString().split('T')[0],
    });
    setSelectedEquipmentId(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'text-blue-600 bg-blue-50';
      case 'IN_PROGRESS': return 'text-yellow-600 bg-yellow-50';
      case 'COMPLETED': return 'text-green-600 bg-green-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading maintenance records...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Records</h1>
          <p className="text-gray-500 mt-1">Track equipment maintenance</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRecord ? 'Edit Maintenance Record' : 'Add New Maintenance Record'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment *</Label>
                  <Select
                    value={selectedEquipmentId?.toString()}
                    onValueChange={(value) => setSelectedEquipmentId(Number(value))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipment.map((equip) => (
                        <SelectItem key={equip.equipmentId} value={equip.equipmentId!.toString()}>
                          {equip.name} ({equip.serialNumber})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as MaintenanceRecord['type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ROUTINE">Routine</SelectItem>
                      <SelectItem value="REPAIR">Repair</SelectItem>
                      <SelectItem value="CALIBRATION">Calibration</SelectItem>
                      <SelectItem value="INSPECTION">Inspection</SelectItem>
                      <SelectItem value="EMERGENCY">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as MaintenanceRecord['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceDate">Maintenance Date *</Label>
                  <Input
                    id="maintenanceDate"
                    type="date"
                    value={formData.maintenanceDate}
                    onChange={(e) => setFormData({ ...formData, maintenanceDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performedBy">Performed By</Label>
                  <Input
                    id="performedBy"
                    value={formData.performedBy}
                    onChange={(e) => setFormData({ ...formData, performedBy: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="nextScheduledDate">Next Scheduled Date</Label>
                  <Input
                    id="nextScheduledDate"
                    type="date"
                    value={formData.nextScheduledDate}
                    onChange={(e) => setFormData({ ...formData, nextScheduledDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRecord ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Next Scheduled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No maintenance records found. Click "Add Maintenance Record" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                <TableRow key={record.recordId}>
                  <TableCell className="font-medium">{record.equipment?.name}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{format(new Date(record.maintenanceDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{record.performedBy || '-'}</TableCell>
                  <TableCell>${record.cost?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>
                    {record.nextScheduledDate ? format(new Date(record.nextScheduledDate), 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(record)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(record.recordId!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
