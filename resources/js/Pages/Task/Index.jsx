import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHandling from "@/Components/TableHandling";

export default function index({ auth, tasks, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          Tasks
        </h2>
      }
    >
      <Head title='Tasks' />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='overflow-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                  <thead
                    className='text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'
                  >
                    <tr className='text-nowrap'>
                      <TableHandling
                        name='id'
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHandling>

                      <TableHandling
                        name='created_at'
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Created Date
                      </TableHandling>

                      <TableHandling
                        name='name'
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHandling>

                      <th className='px-3 py-2'>Image</th>
                      <th className='px-3 py-2'>Created By</th>

                      <TableHandling
                        name='due_date'
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHandling>

                      <TableHandling
                        name='status'
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHandling>

                      <th className='px-3 py-2 items-center justify-between gap-1'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <thead
                    className='text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'
                  >
                    <tr className='text-nowrap'>
                      <th className='px-3 py-2' />
                      <th className='px-3 py-2' />
                      <th className='px-3 py-2'>
                        <TextInput
                          defaultValue={queryParams.name}
                          className='w-full'
                          placeholder='Task Name'
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className='px-3 py-2' />
                      <th className='px-3 py-2' />
                      <th className='px-3 py-2' />
                      <th className='px-3 py-2'>
                        <SelectInput
                          defaultValue={queryParams.status}
                          className='w-full'
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value=''>Select Status</option>
                          <option value='completed'>Completed</option>
                          <option value='in_progress'>In Progress</option>
                          <option value='pending'>Pending</option>
                        </SelectInput>
                      </th>
                      <th className='px-3 py-2' />
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.data.map((task) => (
                      <tr
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                        key={task.id}
                      >
                        <th className='px-3 py-2'>{task.id}</th>
                        <td className='px-3 py-2 text-nowrap'>
                          {task.created_at}
                        </td>
                        <td className='px-3 py-2'>{task.name}</td>
                        <td className='px-3 py-2'>
                          <img
                            src={task.image_path}
                            style={{ width: 100 }}
                            alt='the task'
                          />
                        </td>
                        <td className='px-3 py-2 text-nowrap'>
                          {task.created_by.name}
                        </td>
                        <td className='px-3 py-2 text-nowrap'>
                          {task.due_date}
                        </td>
                        <td className='px-3 py-2'>
                          <span
                            className={`px-3 py-1 rounded text-white ${
                              TASK_STATUS_CLASS_MAP[task.status]
                            }`}
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className='px-3 py-2'>
                          <Link
                            href={route("task.edit", task.id)}
                            className='font-medium text-blue-600 dark:text-blue-600 hover:underline mx-2'
                          >
                            Edit
                          </Link>

                          <Link
                            href={route("task.destroy", task.id)}
                            className='font-medium text-red-600 dark:text-red-600 hover:underline mx-2'
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={tasks.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
