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
	index,
	listLength,
}) => {
	return (
		<div
			className='todo'
			key={todo._id}
			style={{
				backgroundColor: todo.isComplete ? 'rgba(127, 212, 127, 0.5)' : undefined,
				borderBottom: index !== listLength ? '1px solid rgba(0, 0, 0, 0.2)' : undefined,
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', maxWidth: '80%' }}>
				{!isGuestTodo && (
					<input
						type='checkbox'
						name='isComplete'
						value={todo.isComplete}
						checked={todo.isComplete ?? false}
						onChange={() => handleComplete(todo)}
						style={{ cursor: 'pointer' }}
					/>
				)}
				{!isGuestTodo && todoInEditing._id === todo._id ? (
					<div className='todo-edit-container'>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								position: 'relative',
							}}
						>
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
					</div>
				) : (
					<p className='todo-title'>{todo.title}</p>
				)}
			</div>
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
