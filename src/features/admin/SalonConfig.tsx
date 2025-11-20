import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSalonConfigQuery, useUpdateSalonConfigMutation } from '../../api/configApi';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

interface ConfigForm {
  openingTime: string;
  closingTime: string;
  weeklyOffDays: string;
  holidayDates: string;
}

const SalonConfig = () => {
  const { data, isLoading } = useGetSalonConfigQuery();
  const [updateConfig, { isLoading: saving, isSuccess }] = useUpdateSalonConfigMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ConfigForm>();

  useEffect(() => {
    if (data) {
      reset({
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        weeklyOffDays: data.weeklyOffDays.join(', '),
        holidayDates: data.holidayDates.join(', '),
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: ConfigForm) => {
    await updateConfig({
      openingTime: values.openingTime,
      closingTime: values.closingTime,
      weeklyOffDays: values.weeklyOffDays.split(',').map((day) => day.trim()).filter(Boolean),
      holidayDates: values.holidayDates.split(',').map((date) => date.trim()).filter(Boolean),
    });
  };

  if (isLoading || !data) {
    return <Loader fullScreen />;
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow-card">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Salon configuration</h2>
        <p className="text-sm text-slate-500">Define operating hours, weekly closures, and holidays.</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <Input label="Opening time" type="time" {...register('openingTime')} />
        <Input label="Closing time" type="time" {...register('closingTime')} />
        <Input
          label="Weekly off days"
          placeholder="e.g. sunday, monday"
          {...register('weeklyOffDays')}
        />
        <Input
          label="Holiday dates"
          placeholder="YYYY-MM-DD, YYYY-MM-DD"
          {...register('holidayDates')}
        />

        <div className="md:col-span-2 flex items-center gap-4">
          <Button type="submit" isLoading={saving}>
            Save settings
          </Button>
          {isSuccess && <span className="text-sm text-green-600">Configuration updated</span>}
        </div>
      </form>
    </section>
  );
};

export default SalonConfig;

