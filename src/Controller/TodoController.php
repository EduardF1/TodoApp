<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: 'api_todo')]
class TodoController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'api_todo_read', methods: 'GET')]
    public function index(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'api_todo_create', methods: 'POST')]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);
        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => [
                    'text' => [
                        'Could not submit To-Do to the database.'
                    ],
                    'level' => 'error'
                ]
            ]);
        }
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => ['To-Do has been created !','Task : '.$content->name], 'level' => 'success']
        ]);
    }

    #[Route('/update/{id}', name: 'api_todo_update', methods: 'PUT')]
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $content = json_decode($request->getContent());
        $todo->setName($content->name);
        try {
            $this->entityManager->flush();
        }catch (Exception $exception){
            $this->json($exception);
        }

        return $this->json([
           'update_message' => 'todo item with id '.$todo->getId().' has been updated.'
        ]);
    }

    #[Route('/delete/{id}', name: 'api_todo_delete', methods: 'DELETE')]
    public function delete(Todo $todo): JsonResponse
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            $this->json($exception);
        }

        return $this->json([
            'delete_message' => 'todo item with id '.$todo->getId().' has been deleted.'
        ]);
    }
}