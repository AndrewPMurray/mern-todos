import './Todo.css';

export const Todo = ({
	todo,
	editTitle,
	setEditTitle,
	todoInEditing,
	setTodoInEditing,
	handleComplete,
	handleUpdate,
	handleDelete,
	isGuestTodo,
}) => {
	return (
		<div
			className='todo'
			key={todo._id}
			style={{
				backgroundColor: todo.isComplete ? 'rgb(127, 212, 127)' : 'rgb(241, 162, 162)',
			}}
		>
			{!isGuestTodo && (
				<input
					type='checkbox'
					name='isComplete'
					value={todo.isComplete}
					checked={todo.isComplete ?? false}
					onChange={() => handleComplete(todo)}
				/>
			)}
			{!isGuestTodo && todoInEditing._id === todo._id ? (
				<div className='todo-edit-container'>
					<div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
						<input
							className='todo-item-input'
							value={editTitle}
							placeholder='title required'
							name='edit-title'
							onChange={(e) => setEditTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleUpdate(todo);
								}
							}}
						/>
						<p
							style={{
								position: 'absolute',
								right: '5px',
								top: '3px',
								cursor: 'pointer',
							}}
							onClick={() => {
								setEditTitle('');
							}}
						>
							x
						</p>
					</div>
					<button className='todo-edit-button' onClick={() => handleUpdate(todo)}>
						Save
					</button>
				</div>
			) : (
				<p className='todo-title'>{todo.title}</p>
			)}
			{!isGuestTodo && (
				<div className='edit-task-icons'>
					<div
						onClick={() => {
							setEditTitle(todo.title);
							setTodoInEditing(todo);
						}}
					>
						<i className='fa-regular fa-pen-to-square' />
					</div>
					<p
						onClick={() => {
							handleDelete(todo._id);
						}}
					>
						<i className='fa-solid fa-trash' />
					</p>
				</div>
			)}
		</div>
	);
};
